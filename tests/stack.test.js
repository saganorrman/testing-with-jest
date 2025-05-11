const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

/*
test('peek does not remove the top value from the stack', () => {
    stack.push("test");
    let firstPeek = stack.peek();   // Förväntas ge "test"
    let secondPeek = stack.peek();  // Förväntas ge "test" igen

    expect(firstPeek).toBe("test");
    expect(secondPeek).toBe("test"); // Denna rad kommer att MISSLYCKAS om peek tar bort
});

test("peek should return the top of the stack without removing it", () => {
    const stack = require('../src/stack');
    stack.push("äpple");
    let top = stack.peek();
    expect(top).toBe("äpple");
    let nextTop = stack.peek();
    expect(nextTop).toBe("äpple"); // Detta kommer att FAILA om peek() poppar
});
*/