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
  if(isNaN(num1) || isNaN(num2)){

  } else {
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

// add event listener for delete key
deleteKey.addEventListener('click', deleteNumber);
// add event listener for clear key
clearKey.addEventListener('click', e => {
  location.reload();
})