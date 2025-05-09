const _ = require('underscore');

let stack = [];

// Lägger ett element överst i stacken
exports.push = function (x) {
    stack.push(x);
};

// Returnerar det översta elementet i stacken och tar bort det
exports.pop = function () {
    return stack.pop();
}

// Returnerar det översta elementet i stacken
exports.peek = function () {
    return _.last(stack);
}

//Den här funktionen returnerar det översta elementet i stacken utan att ta bort det. OBS! Här är en medveten bugg: den använder stack[0] istället för stack[stack.length - 1]. Detta ska du rätta senare när du skriver tester för denna funktion.