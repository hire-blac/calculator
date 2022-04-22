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

// function to input a number
function inputNumber(keyValue){
  if(!operator){ // operator has not been set before
    numberString += keyValue;
    firstNum = Number(numberString);

    // display values
    displayString += keyValue;
    displayCalculations(bigDisplay, displayString);
    
  } else { // perform calculation for previous operator befor setting a new one
    numberString += keyValue;
    secondNum = Number(numberString);

    // display values
    displayString += keyValue;
    displayCalculations(bigDisplay, displayString);
  }
}

// function to input operator
function inputOperator(keyValue){
  if(!operator){
    numberString = '';
    operator = keyValue;

    // display values
    displayString += " " + keyValue + " ";
    displayCalculations(bigDisplay, displayString);

  } else {
    firstNum = calculate(firstNum, secondNum, operator);
    
    operator = keyValue;

    // display values
    displayString += " " + keyValue + " ";
    displayCalculations(bigDisplay, displayString);
  }
}

// perform calculation
function calculate(num1, num2, operator){
  let answer = 0;
  if(isNaN(num1) || isNaN(num2)){

  } else {
    switch (operator) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      case '/':
        if(num2 === 0){
          answer = "Cannot divide by 0"
        } else {
          answer = num1 / num2;
        }
        break;
      default:
        break;
    }
  }
  
  // display values
  displayCalculations(smallDisplay, displayString);
  displayString = answer;
  displayCalculations(bigDisplay, displayString);

  // reset numberString, operator and secondNum
  numberString = '';
  operator = '';
  secondNum = 0;

  return answer;
}

// delete function
function deleteNumber(){
  let displayLen = displayString.length;
  let firstNumString = firstNum.toString();
  let firstNumLen = firstNumString.length;
  let secondNumString = secondNum.toString();
  let secondNumLlen = secondNumString.length;
  
  if (secondNum != 0) {
    // remove last digit of second number
    secondNumString = secondNumString.slice(0, secondNumLlen - 1);
    secondNum = Number(secondNumString);

    // update display
    displayString = displayString.slice(0, displayLen - 1);
    displayCalculations(bigDisplay, displayString);

  } else if(operator){
    // delete operator
    operator = '';

    // update display
    if(isNaN(displayString)){
      displayString = displayString.slice(0, displayLen - 3);
      displayCalculations(bigDisplay, displayString);
    } else {
      location.reload();
    }
    
  } else {
    // remove last digit of second number
    firstNumString = firstNumString.slice(0, firstNumLen - 1);
    firstNum = Number(firstNumString);

    // update display
    if(isNaN(displayString)){
      displayString = displayString.slice(0, displayLen - 3);
      displayCalculations(bigDisplay, displayString);
    } else {
      location.reload();
    }
  }
} 

// display calculations
function displayCalculations(element, displayValue){
  element.textContent = displayValue;
}

// add event handler to number keys to set a value for first or second num
numberKeys.forEach(key => {
  key.addEventListener("click", () => inputNumber(key.dataset.value));
});

// add event handler to operator keys to set a value for operator
operatorKeys.forEach(key => {
  key.addEventListener("click", () => inputOperator(key.dataset.value));
});

// add event listener for equals key
equalsKey.addEventListener('click', () => {
  firstNum = calculate(firstNum, secondNum, operator);
  
})

// add event listener for delete key
deleteKey.addEventListener('click', deleteNumber);
// add event listener for clear key
clearKey.addEventListener('click', () => {
  location.reload();
})

// keyboard support functionality
window.addEventListener('keydown', e => {
  let key;
  
  if (e.key === 'Enter') { // if Enter key is pressed
    key = document.querySelector('.equals');
  }else {
    key = document.querySelector(`.key[data-value="${e.key}"]`);
  }

  if(key){
    key.classList.forEach(className => {
      if(className === 'number'){
        inputNumber(key.dataset.value);
      } else if (className === 'operator') {
        inputOperator(key.dataset.value);
      } else if (className === 'equals') {
        firstNum = calculate(firstNum, secondNum, operator);
      } else if (className === 'delete') {
        deleteNumber();
      } else if (className === 'clear') {
        location.reload();
      }
    });
  }
})