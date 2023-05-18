let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;
let calculationDisplayValue = "";

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
  if (b === 0) {
    return "Error: Division by zero is not allowed";
  }
  return a / b;
}

function operate(operator, a, b) {
  let result;
  switch (operator) {
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      if (b === 0) {
        displayValue = 'Error: Division by zero is not allowed';
        updateDisplay();
        return;
      }
      result = divide(a, b);
      break;
    default:
      return 'Error: Invalid operator';
  }
  return Math.round(result * 1000000) / 1000000; // rounding to 6 decimal places
}

function updateDisplay() {
  const display = document.querySelector("#display");
  display.textContent = displayValue;
}

function updateCalculationDisplay() {
  const display = document.querySelector("#calculationDisplay");
  display.textContent = calculationDisplayValue;
}

const digits = document.querySelectorAll(".digit");
digits.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (waitingForSecondValue) {
      displayValue = "";
      waitingForSecondValue = false;
    }
    if (event.target.textContent === '.' && displayValue.includes('.')) {
      return;
    }
    displayValue += event.target.textContent;
    calculationDisplayValue += event.target.textContent;
    updateDisplay();
    updateCalculationDisplay();
  });
});

const operations = document.querySelectorAll(".operation");
operations.forEach(button => {
  button.addEventListener('click', (event) => {
    if (displayValue.includes('Error')) return;
    if (firstValue === null) {
      firstValue = Number(displayValue);
    } else if (operator) {
      const result = operate(operator, firstValue, Number(displayValue));
      displayValue = String(result);
      firstValue = result;
    }
    waitingForSecondValue = true;
    operator = event.target.textContent;
    calculationDisplayValue += " " + event.target.textContent + " ";
    updateDisplay();
    updateCalculationDisplay();
  });
});

document.querySelector('#equals').addEventListener('click', () => {
  if (firstValue === null || operator === null || displayValue.includes('Error')) return;
  const result = operate(operator, firstValue, Number(displayValue));
  displayValue = String(result);
  firstValue = null;
  operator = null;
  calculationDisplayValue = "";
  updateDisplay();
  updateCalculationDisplay();
});

document.querySelector('#backspace').addEventListener('click', () => {
  if (displayValue.length === 1) {
    displayValue = '0';
  } else {
    displayValue = displayValue.slice(0, -1);
  }
  updateDisplay();
});

document.querySelector("#clear").addEventListener("click", () => {
  displayValue = "0";
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  calculationDisplayValue = "";
  updateDisplay();
  updateCalculationDisplay();
});

document.addEventListener('keydown', (event) => {
  if ((event.key >= 0 && event.key <= 9) || event.key === '.') { // digit keys and decimal point
    if (event.key === '.' && displayValue.includes('.')) {
      return;
    }
    if (waitingForSecondValue) {
      displayValue = "";
      waitingForSecondValue = false;
    }
    displayValue += event.key;
    calculationDisplayValue += event.key;
    updateDisplay();
    updateCalculationDisplay();
  } else if (['+', '-', '*', '/'].includes(event.key)) { // operation keys
    if (firstValue !== null && operator !== null) {
      const result = operate(operator, firstValue, Number(displayValue));
      displayValue = String(result);
      firstValue = result;
    }
    firstValue = Number(displayValue);
    waitingForSecondValue = true;
    operator = event.key;
    calculationDisplayValue += " " + event.key + " ";
    updateDisplay();
    updateCalculationDisplay();
  } else if (event.key === 'Enter' || event.key === '=') { // equals key
    if (firstValue === null || operator === null) return;
    const result = operate(operator, firstValue, Number(displayValue));
    displayValue = String(result);
    firstValue = null;
    operator = null;
    calculationDisplayValue = "";
    updateDisplay();
    updateCalculationDisplay();
  } else if (event.key === 'Backspace') { // backspace key
    if (displayValue.length === 1) {
      displayValue = '0';
    } else {
      displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
  } else if (event.key === 'Escape') { // clear key
    displayValue = '0';
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    calculationDisplayValue = "";
    updateDisplay();
    updateCalculationDisplay();
  }
});


