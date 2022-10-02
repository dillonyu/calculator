const mainDisplay = document.querySelector('.display .main');   // the larger bottom display
const topDisplay = document.querySelector('.display .top pre'); // the smaller top display
let operating = false;  // if an operation is currently taking place
let completedOperation = false; // if an operation was just completed
let curResult = 0;  // the current saved result after an operation
let equation = [""];  // equation array with format [operand 1, operator, operand 2]

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
        topDisplay.textContent += text;
        operating = false;
    } else if (mainDisplay.textContent === '-0' && text != '.') {
        mainDisplay.textContent = `-${text}`;
    } else if (mainDisplay.textContent.length < 10) { // prevents user from manually overflowing display
        mainDisplay.textContent += text;
        topDisplay.textContent += text;
    }
}

function reset() {
    mainDisplay.textContent = 0;
    topDisplay.textContent = '';
    equation = [""];
    completedOperation = false;
}

function negateDisplay() {
    if (mainDisplay.textContent.charAt(0) === '-') {
        // if the displayed num is currently negative, remove the negative sign    
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
                    reset();
                    return;
                case '+/-': 
                    negateDisplay();
                    return;
                case '.':
                    if (!mainDisplay.textContent.includes('.')) mainDisplay.textContent += '.';
                    return;
                case '=':
                    if (equation.length < 3) {
                        return;
                    }
                    if (equation[1] == '÷' && equation[2] == 0) {
                        alert("Cannot divide by 0!");
                        reset();
                        return;
                    }
                    curResult = operate(equation[1], equation[0], equation[2]);
                    mainDisplay.textContent = curResult;
                    topDisplay.textContent += ` ${buttonText} ${curResult}`;
                    equation = [];
                    completedOperation = true;
                    return;
                default: // an operation button was pressed
                    if (completedOperation) {
                        topDisplay.textContent = `${curResult} ${buttonText} `;
                        equation.push(mainDisplay.textContent);
                        completedOperation = false;
                    } else {
                        topDisplay.textContent += ` ${buttonText} `;
                    }
                    if (equation.length === 3) { // pair of numbers exists in equation, evaluate now and clear equation
                        curResult = operate(equation[1], equation[0], equation[2]);
                        mainDisplay.textContent = curResult;
                        equation = [];
                        equation.push(curResult);
                    }
                    equation.push(buttonText);
                    operating = true; 
                }
        } else {
            if (equation.length == 2) {
                equation.push("");
            }
            equation[equation.length - 1] += buttonText;
            updateDisplay(buttonText);
        }
        console.log(equation);
    });
});
