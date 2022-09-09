let displayNum = 0;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

function updateDisplay(text) {
    const display = document.querySelector('.display');
    console.log(display.textContent.length);
    if (display.textContent === '0') display.textContent = text;
    else if (display.textContent.length < 10) display.textContent += text;
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        displayNum = button.textContent;
        if (isNaN(displayNum)) {
            // do something
        } else {
            updateDisplay(displayNum);
        }
    });
});
