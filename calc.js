const display = document.querySelector('.display .main');

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
        case '÷': return divide(a, b);
    }
}

function updateDisplay(text) {
    if (display.textContent === '0') display.textContent = text;
    else if (display.textContent === '-0' && text != '.') display.textContent = `-${text}`;
    else if (display.textContent.length < 10) display.textContent += text;
}

function clearDisplay() {
    display.textContent = 0;
}

function negateDisplay() {
    if (display.textContent.charAt(0) === '-') {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = `-${display.textContent}`;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let buttonText = button.textContent;
        if (isNaN(buttonText)) {
            switch(buttonText) {
                case 'AC': 
                    clearDisplay(display);
                    return;
                case '+/-': 
                    negateDisplay();
                    return;
                case '.':
                    if (!display.textContent.includes('.')) display.textContent += '.';
                    return;
            }
        } else {
            updateDisplay(buttonText);
        }
    });
});
