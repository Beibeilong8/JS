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
function returnText(){
    calcOutput.innerHTML = `${textOutput}`;
}
function getComma(){
    number = '.';
    if (textOutput === ''){
        textOutput = "0" + number;
        allItems.push('0');
    }
    else{textOutput = textOutput + number;}
}
function clearingCalc(){
    textOutput = '0';
    returnText();
    result = 0;
    allItems = [''];
    numberOne = 0;
    numberTwo = 0;
    indexOfOperatorArr = [];
    operatorOne = 0;
}
function backspaceCalc(){
    if(textOutput.split === undefined){return} // fix error when delete result
    textOutputArray = textOutput.split('');
    textOutputArray.pop(); // delete item from the end
    allItems.pop();
    if (allItems.length <= indexOfOperator){operatorOne = 0;}
    textOutput = textOutputArray.join('');
    returnText();
}
function calcIndexOfOperator(){
    indexOfOperator = allItems.indexOf(operator,0);
    console.log(indexOfOperator)
}
function calcIndexOfEqual(){
    indexOfEqual = allItems.indexOf(operator,indexOfOperator);
}
function calcNumbers(){
    let numberOneArray = allItems.slice(0,indexOfOperator);
    numberOne = Number(numberOneArray.join(''));

    let numberTwoArray = allItems.slice(indexOfOperator+1,indexOfEqual);
    numberTwo = Number(numberTwoArray.join(''));
}
function checkInfinity(){
    if (result === Infinity || result === -Infinity){textOutput = 'Разделить на 0 нельзя';}
}
function checkOperator(){
    if (operatorOne !== undefined && operatorOne !== 0){
        allItems.pop();
    } else{
        calcIndexOfOperator();
        operatorOne = operator;
        textOutput = textOutput + operator;
    }
}

//-----------------------------Stopwatch----------------------------------------------------------------

const timeOutput = document.querySelector('.time-output');
const timeButtons = document.querySelectorAll('.button');
const buttonFirst = document.querySelector('.first');
const buttonSecond = document.querySelector('.second');
const circleBody = document.querySelector(`.circleStrings`);
const millisecondsInSecond = 100;
const secondsInMinute = 60;

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
    const addTime = function(){
        let className = item.className;
        switch (className){
            case 'button first Start':
                timer = setInterval(timeCounter, 10);
                toButtonToggle('Start', 'Stop',`Reset`, `Circle`);
                break;
            case 'button first Stop' :
                clearTimeout(timer);
                toButtonToggle('Stop', 'Start',`Circle`, `Reset`);
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
function returnTime(){
    let milliSecondsReturn = returnTimeWithTwoSymbols(milliSeconds);
    let secondsReturn = returnTimeWithTwoSymbols(seconds);
    let minutesReturn = returnTimeWithTwoSymbols(minutes);
    timeOutput.innerHTML = `${minutesReturn}:${secondsReturn}:${milliSecondsReturn}`;
}
function timeCounter(){
    milliSeconds++;
    if (milliSeconds===millisecondsInSecond) {
        seconds++;
        milliSeconds = `0`;
    }
    if (seconds===secondsInMinute) {
        minutes++;
        seconds = `0`;
    }
    returnTime();
}
const toButtonToggle = (classRemoveFirstButton, classAddFirstButton, classRemoveSecondButton,classAddSecondButton) => {
    buttonFirst.classList.remove(classRemoveFirstButton);
    buttonFirst.classList.add(classAddFirstButton);
    buttonFirst.innerHTML = `${classAddFirstButton}`;
    buttonSecond.classList.remove(classRemoveSecondButton);
    buttonSecond.classList.add(classAddSecondButton);
    buttonSecond.innerHTML = `${classAddSecondButton}`;
};
const createPostElement = (tag, className) => {
    const elem = document.createElement(tag);
    elem.classList.add(className);
    return elem;
};
const circleTitle = createPostElement('tr', 'circle-title');
function toClickReset(){
    clearTimeout(timer);
    milliSeconds = '0';
    seconds = '0';
    minutes = '0';
    returnTime();
    circleTitle.innerHTML = ``;
    circleBody.innerHTML = ``;
    circlePreviousTime = new Date(0, 0, 0, 0, 0, 0, 0);
    counterCircle = 1;
    title = false;
}
function createCircle(){
    const circleNumberTitle = createPostElement('td', 'circle-number');
    const lapTimeTitle = createPostElement('td', 'lapTime');
    const allTimeTitle = createPostElement('td', 'allTime');
    const contentCircle = createPostElement('tr', 'contentCircle');
    const circleNumber = createPostElement('td', 'circle-number');
    const lapTime = createPostElement('td', 'lapTime');
    const allTime = createPostElement('td', 'allTime');
    const circleHead = document.querySelector(`.title`);

    let circleTimeAll = new Date(0, 0, 0, 0, minutes, seconds, milliSeconds*10);
    let circleTimeOutput;

    // ------------------- Create title for circle table -----------------------------------
    if(title === false)  {
        circleNumberTitle.innerHTML = `Circle`;
        lapTimeTitle.innerHTML = `Lap Time`;
        allTimeTitle.innerHTML = `Total Time`;

        circleTitle.append(circleNumberTitle);
        circleTitle.append(lapTimeTitle);
        circleTitle.append(allTimeTitle);
        circleHead.append(circleTitle);

        title = true;
    }

    // ------------------- Create string of circle table -----------------------------------

    circleNumber.innerHTML = counterCircle;
    counterCircle++;

    circleTime = new Date(circleTimeAll.getTime() - circlePreviousTime.getTime());
    circlePreviousTime = new Date(circlePreviousTime.getTime() + circleTime.getTime());

    circleMinutes = circleTime.getMinutes();
    circleSecond = circleTime.getSeconds();
    circleMilliSeconds = circleTime.getMilliseconds();

    let circleMinutesReturn = returnTimeWithTwoSymbols(circleMinutes);
    let circleSecondReturn = returnTimeWithTwoSymbols(circleSecond);

    // ------------ MillisecondReturn calc so, because milliseconds get 3 symbols ----------

    let circleMilliSecondsReturn;
    (circleMilliSeconds === 1000) ? circleMilliSecondsReturn = `99`
        : (circleMilliSeconds === 0) ? circleMilliSecondsReturn = `00`
        : (circleMilliSeconds <= 99) ? circleMilliSecondsReturn = `0${Math.trunc(circleMilliSeconds/10)}`
            : circleMilliSecondsReturn = `${Math.trunc(circleMilliSeconds/10)}`;

    circleTimeOutput = `${circleMinutesReturn}:${circleSecondReturn}:${circleMilliSecondsReturn}`;
    lapTime.innerHTML = circleTimeOutput;
    allTime.innerHTML = `${timeOutput.innerHTML}`;

    contentCircle.append(circleNumber);
    contentCircle.append(lapTime);
    contentCircle.append(allTime);
    circleBody.prepend(contentCircle);
}
const returnTimeWithTwoSymbols = (item) => {
    let itemReturn = item;
    if (itemReturn <=9 ) {
        itemReturn = `0${item}`
    }
    return itemReturn;
};
