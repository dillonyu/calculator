const mainDisplay = document.querySelector('.display .main');
const topDisplay = document.querySelector('.display .top pre');
let operating = false;
let equation = [];

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
        case '+': return add(+a, +b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '÷': return divide(a, b);
    }
}

function updateDisplay(text) {
    if (mainDisplay.textContent === '0' || operating) {
        mainDisplay.textContent = text;
        operating = false;
    }
    else if (mainDisplay.textContent === '-0' && text != '.') mainDisplay.textContent = `-${text}`;
    else if (mainDisplay.textContent.length < 10) mainDisplay.textContent += text;
}

function clearDisplay() {
    mainDisplay.textContent = 0;
    topDisplay.textContent = '';
}

function negateDisplay() {
    if (mainDisplay.textContent.charAt(0) === '-') {
        mainDisplay.textContent = mainDisplay.textContent.slice(1);
    } else {
        mainDisplay.textContent = `-${mainDisplay.textContent}`;
    }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let buttonText = button.textContent;
        if (isNaN(buttonText)) {
            switch(buttonText) {
                case 'AC': 
                    clearDisplay(mainDisplay);
                    return;
                case '+/-': 
                    negateDisplay();
                    return;
                case '.':
                    if (!mainDisplay.textContent.includes('.')) mainDisplay.textContent += '.';
                    return;
                case '=':
                    topDisplay.textContent += `${mainDisplay.textContent} ${buttonText} `;
                    equation.push(mainDisplay.textContent);
                    const result = operate(equation[1], equation[0], equation[2]);
                    mainDisplay.textContent = result;
                    equation = [];
                    return;
                default:
                    topDisplay.textContent += `${mainDisplay.textContent} ${buttonText} `;
                    equation.push(mainDisplay.textContent);
                    equation.push(buttonText);
                    operating = true; 
            }
        } else {
            updateDisplay(buttonText);
        }
    });
});
