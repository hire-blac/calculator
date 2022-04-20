// declare and initialize constants
const numberKeys = document.querySelectorAll(".number");
const operatorKeys = document.querySelectorAll(".operator");
const equalsKey = document.querySelector(".equals");
const clearKey = document.querySelector(".clear");
const deleteKey = document.querySelector(".delete");
const smallDisplay = document.querySelector(".small-display");
const bigDisplay = document.getElementById("big-display");

// 
let operator = '';
let firstNum = 0;
let secondNum = 0;
let numberString = '';
let displayString = '';

// perform calculation
function calculate(num1, num2, operator){
  let answer = 0;
  switch (operator) {
    case '+':
      answer = num1 + num2;
      break;
    case '-':
      answer = num1 - num2;
      break;
    case 'x':
      answer = num1 * num2;
      break;
    case '/':
      answer = num1 / num2;
      break;
    default:
      break;
  }

  // display values
  displayCalculations(smallDisplay, displayString);
  displayString = answer;
  displayCalculations(bigDisplay, displayString);

  // reset numberString and secondNum
  numberString = '';
  secondNum = 0;

  return answer;
}

// display calculations
function displayCalculations(element, displayValue){
  element.textContent = displayValue;
}

// add event handler to number keys to set a value for first or second num
numberKeys.forEach(key => {
  key.addEventListener("click", e => {
    if(!operator){ // operator has not been set before
      numberString += key.dataset.value;
      firstNum = Number(numberString);

      // display values
      displayString += key.dataset.value;
      displayCalculations(bigDisplay, displayString);
      
    } else { // perform calculation for previous operator befor setting a new one
      numberString += key.dataset.value;
      secondNum = Number(numberString);

      // display values
      displayString += key.dataset.value;
      displayCalculations(bigDisplay, displayString);
    }
    
  });
});

// add event handler to operator keys to set a value for operator
operatorKeys.forEach(key => {
  key.addEventListener("click", e => {
    if(!operator){
      numberString = '';
      operator = key.dataset.value;

      // display values
      displayString += " " + key.dataset.value + " ";
      displayCalculations(bigDisplay, displayString);

    } else {
      firstNum = calculate(firstNum, secondNum, operator);
      
      operator = key.dataset.value;

      // display values
      displayString += " " + key.dataset.value + " ";
      displayCalculations(bigDisplay, displayString);
    }
  });
});

// add event listener for equals key
equalsKey.addEventListener('click', e => {
  firstNum = calculate(firstNum, secondNum, operator);
  
})

// add event listener for clear key
clearKey.addEventListener('click', e => {
  location.reload();
})