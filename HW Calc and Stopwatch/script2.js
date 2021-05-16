// --------------------------Calc------------------------------------------------------

const calcOutput = document.querySelector('.calc-output'),
    itemsAll = document.querySelectorAll('th');
let number = 0,
    textOutput = '',
    result = 0,
    operator = '',
    allItems = [],
    textOutputArray,
    indexOfOperator,
    indexOfOperatorArr = [],
    indexOfEqual,
    operatorOne,
    numberOne,
    numberTwo;
itemsAll.forEach((item) =>{
    let addText = function(){
        let className = item.className;

        // For numbers 0-9 + ','
        if(textOutput === 'Разделить на 0 нельзя') {clearingCalc();}
        if(textOutput === '0'){textOutput = ''} // for situations such as "056"

        if(className === 'calc-numbers'){
            number = this.dataset.id;
            (number === 'comma') ? getComma() : textOutput = textOutput + number;
            allItems.push(number);
            returnText();
        }

        // For operators (!%)
        if(className === 'calc-operators'){

            operator = this.dataset.id;

			if(operator === undefined){return} // for %

			if(operator === 'c'){
                clearingCalc();
                return;
            }

            if(operator === 'delete'){
                backspaceCalc();
                return
            }

            allItems.push(operator);

            if (operator === '='){
                // allItems.push(operator);

                calcIndexOfEqual();
                calcNumbers();
                if (numberTwo === undefined){return}

                switch(operatorOne) {
                    case '/': result = numberOne / numberTwo; break;
                    case '*': result = numberOne * numberTwo; break;
                    case '-': result = numberOne - numberTwo; break;
                    case '+': result = numberOne + numberTwo; break;
                    default: result = 0;
                }
                result = +result.toFixed(2);
                allItems = [result];
                textOutput = result;
                numberOne = result;
                operatorOne = 0;
                checkInfinity();

            } else{checkOperator();}

            // add text of HTML
            returnText();
        }
    };
    item.addEventListener('click', addText);
});
const returnText = function(){calcOutput.innerHTML = `${textOutput}`;};
const getComma = function(){
	number = '.';
    if (textOutput === ''){
       textOutput = "0" + number;
       allItems.push('0');
    }
    else{textOutput = textOutput + number;}
};
const clearingCalc = function(){
    textOutput = '0';
    returnText();
    result = 0;
    allItems = [''];
    numberOne = 0;
    numberTwo = 0;
    indexOfOperatorArr = [];
    operatorOne = 0;
};
const backspaceCalc = function(){
	if(textOutput.split === undefined){return} // fix error when delete result
	textOutputArray = textOutput.split('');
	textOutputArray.pop(); // delete item from the end
    allItems.pop();
    if (allItems.length <= indexOfOperator){operatorOne = 0;}
    textOutput = textOutputArray.join('');
    returnText();
};
const calcIndexOfOperator = function(){
    indexOfOperator = allItems.indexOf(operator,0);
    console.log(indexOfOperator)
};
const calcIndexOfEqual = function(){indexOfEqual = allItems.indexOf(operator,indexOfOperator);};
const calcNumbers = function(){
    let numberOneArray = allItems.slice(0,indexOfOperator);
    numberOne = Number(numberOneArray.join(''));

    let numberTwoArray = allItems.slice(indexOfOperator+1,indexOfEqual);
    numberTwo = Number(numberTwoArray.join(''));
};
const checkInfinity = function(){
    if (result === Infinity || result === -Infinity){textOutput = 'Разделить на 0 нельзя';}
};
const checkOperator = function(){
    if (operatorOne !== undefined && operatorOne !== 0){
        allItems.pop();
    } else{
        calcIndexOfOperator();
        operatorOne = operator;
        textOutput = textOutput + operator;
    }
};

//-----------------------------Stopwatch----------------------------------------------------------------

const timeOutput = document.querySelector('.time-output');
const timeButtons = document.querySelectorAll('.button');
const buttonFirst = document.querySelector('.first');
const buttonSecond = document.querySelector('.second');
const circlesContainer = document.querySelector('.circles');
const circleHead = document.querySelector(`.title`);
let milliSeconds = '0';
let seconds = '0';
let minutes = '0';
let timer;
let counterCircle = 1;
let circleMilliSeconds = '0';
let circleSecond = '0';
let circleMinutes = '0';
let circlePreviousTime = new Date(0, 0, 0, 0, 0, 0, 0);
let circleTime = new Date(0, 0, 0, 0, 0, 0, 0);
let title = false;

timeButtons.forEach((item) =>{
    let addTime = function(){
        let className = item.className;
        switch (className){
            case 'button first Start':
                timer = setInterval(timeCounter, 10);
                toButtonToggle('Start', 'Stop',`Reset`, `Circle`);
                // toButtonToggle('Stop',`Circle`);
                break;
            case 'button first Stop' :
                clearTimeout(timer);
                toButtonToggle('Stop', 'Start',`Circle`, `Reset`);
                // toButtonToggle('Start', `Reset`);
                break;
            case 'button second Reset':
                toClickReset();
                break;
            default :
                createCircle();
        }
    };
    item.addEventListener('click', addTime);
});
let returnTime = function(){
    let milliSecondsReturn = returnTimeWithTwoSymbols(milliSeconds);
    let secondsReturn = returnTimeWithTwoSymbols(seconds);
    let minutesReturn = returnTimeWithTwoSymbols(minutes);
    timeOutput.innerHTML = `${minutesReturn}:${secondsReturn}:${milliSecondsReturn}`;
};
let timeCounter = function(){
    milliSeconds++;
    if (milliSeconds===100) {
        seconds++;
        milliSeconds = `0`;
    }
    if (seconds===60) {
        minutes++;
        seconds = `0`;
    }
    returnTime();
};
let toButtonToggle = function(classRemoveFirstButton, classAddFirstButton, classRemoveSecondButton,classAddSecondButton){
    buttonFirst.classList.remove(classRemoveFirstButton);
    buttonFirst.classList.add(classAddFirstButton);
    buttonFirst.innerHTML = `${classAddFirstButton}`;
    buttonSecond.classList.remove(classRemoveSecondButton);
    buttonSecond.classList.add(classAddSecondButton);
    buttonSecond.innerHTML = `${classAddSecondButton}`;
};

// Попытка сократить код, неудачная
// let toButtonToggle = function(classAddFirstButton, classAddSecondButton){
//     buttonFirst.classList.toggle(classAddFirstButton);
//     buttonFirst.innerHTML = `${classAddFirstButton}`;
//
//     buttonSecond.classList.toggle(classAddSecondButton);
//     buttonSecond.innerHTML = `${classAddSecondButton}`;
// };

const toClickReset = function(){
    clearTimeout(timer);
    milliSeconds = '0';
    seconds = '0';
    minutes = '0';
    returnTime();
    circlesContainer.innerHTML = '';
    // circleTitle.innerHTML = ``;
    // circleHead.innerHTML = ``;
    // console.log(circleTitle);
    circlePreviousTime = new Date(0, 0, 0, 0, 0, 0, 0);
    counterCircle = 1;
    title = false;
};
let createPostElement = (tag, className) => {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    return elem;
};
const circleTitle = createPostElement('tr', 'circle-title');

let createCircle = function(){
    const circleNumberTitle = createPostElement('td', 'circle-number');
    const lapTimeTitle = createPostElement('td', 'lapTime');
    const allTimeTitle = createPostElement('td', 'allTime');

    const contentCircle = createPostElement('tr', 'contentCircle');
    const circleNumber = createPostElement('td', 'circle-number');
    const lapTime = createPostElement('td', 'lapTime');
    const allTime = createPostElement('td', 'allTime');
    let circleTimeAll = new Date(0, 0, 0, 0, minutes, seconds, milliSeconds*10);
    let circleTimeOutput;

    // ------------------- Create title for circle table -----------------------------------
    // console.log(circleHead)
    if(title === false)  {
          circleNumberTitle.innerHTML = `Circle`;
          lapTimeTitle.innerHTML = `Lap Time`;
          allTimeTitle.innerHTML = `Общее время`;

          circleTitle.append(circleNumberTitle);
          circleTitle.append(lapTimeTitle);
          circleTitle.append(allTimeTitle);
          circleHead.append(circleTitle);
          console.log(circleHead);
          title = true;
    }

    // ------------------- Create string of circle table -----------------------------------

    circleNumber.innerHTML = counterCircle;
    counterCircle++;

    circleTime = new Date(circleTimeAll.getTime() - circlePreviousTime.getTime());

    circleMinutes = circleTime.getMinutes();
    circleSecond = circleTime.getSeconds();
    circleMilliSeconds = circleTime.getMilliseconds();

    let circleMinutesReturn = returnTimeWithTwoSymbols(circleMinutes);
    let circleSecondReturn = returnTimeWithTwoSymbols(circleSecond);
    let circleMilliSecondsReturn;

    (circleMilliSeconds === 1000) ? circleMilliSecondsReturn = `99`
        : (circleMilliSeconds === 0) ? circleMilliSecondsReturn = `00`
        : (circleMilliSeconds <= 99) ? circleMilliSecondsReturn = `0${Math.trunc(circleMilliSeconds/10)}`
        : circleMilliSecondsReturn = `${Math.trunc(circleMilliSeconds/10)}`;

    circleTimeOutput = `${circleMinutesReturn}:${circleSecondReturn}:${circleMilliSecondsReturn}`;

    circlePreviousTime = circlePreviousTime.getTime() + circleTime.getTime();
    circlePreviousTime = new Date(circlePreviousTime);

    lapTime.innerHTML = circleTimeOutput;
    allTime.innerHTML = `${timeOutput.innerHTML}`;

    contentCircle.append(circleNumber);
    contentCircle.append(lapTime);
    contentCircle.append(allTime);
    circlesContainer.prepend(contentCircle);
};

let returnTimeWithTwoSymbols = (item) => {
    let itemReturn = item;
    if (itemReturn <=9 ) {
        itemReturn = `0${item}`
    }
    return itemReturn;
};