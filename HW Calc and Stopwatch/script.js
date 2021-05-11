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