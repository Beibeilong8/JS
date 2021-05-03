let calcOutput = document.querySelector('.calc-output'),
    thAll = document.querySelectorAll('th'),
    number = 0,
    textOutput = '',
    result = 0,
    operator = '',
    allItems = ['0'],
    textOutputArray,
    comma = false,
    min,
    operatorOne;
thAll.forEach((item) =>{
    let addText = function(){
        let className = item.className;
        let numberOne;
        let numberTwo;

        // For numbers 0-9 + ','
        if(className === 'calc-numbers'){
            number = this.dataset.id;
            if (number === 'comma'){
            	number = '.';
            	if (textOutput === ''){
            		comma=true;
            		textOutput = "0" + number;
            	}
        		else{textOutput = textOutput + number;}
            }
            else{
            	textOutput = textOutput + number;}
            allItems.push(number);
            calcOutput.innerHTML = `${textOutput}`;
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
                deleteCalc();
                return
            }

            allItems.push(operator);

            if (operator === '='){

                if(comma){
                    numberOne = Number(textOutput.substring(0,min)); // min = index of operator
                    max= allItems.indexOf(operator,min); // max = index of operator '='
                    numberTwo = Number(textOutput.substring(min,max));
                } else{
                    numberOne = Number(textOutput.substring(0,(min-1)));
                    max = allItems.indexOf(operator,min);
                    numberTwo = Number(textOutput.substring(min,max-1));
                }

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
            } else{
            	cointerNumber();
            	operatorOne = operator;
                textOutput = textOutput + operator;
            }
            // add text of HTM
            calcOutput.innerHTML = `${textOutput}`;
        }

    };

    item.addEventListener('click', addText);
});
let clearingCalc = function(){
	calcOutput.innerHTML = '';
    textOutput = '';
    result = 0;
    allItems = [''];
};
let deleteCalc = function(){
	if(textOutput.split === undefined){return} // fix error when delete result
	textOutputArray = textOutput.split('');
	textOutputArray.pop(); // delete item from the end
	textOutput = textOutputArray.join('');
	calcOutput.innerHTML = `${textOutput.substring(0, textOutput.length)}`;
};
let cointerNumber = function(){
     min = allItems.indexOf(operator,0);
};



// calcNumbers.forEach((item) =>{
//     let addText = () => {
//         number = item.id;
//         if (number === 'comma'){number = ','}
//         textOutput = textOutput + number;
//         calcOutput.innerHTML = `${textOutput}`;
//         let numberOne = 0;
//         numberOne = numberOne + number;
//         console.log(numberOne);
//     };
//     item.addEventListener('click', addText);
// });
// calcOperators.forEach((item) =>{
//     let addText = () => {
//         operator = item.id;
//         if (operator === '='){
//             switch(operator){
//                 case 'c':
//                     calcOutput.innerHTML = '';
//                     textOutput = '';
//                     result = 0;
//                     break;
//                 case 'delete':
//                     calcOutput.innerHTML = `${textOutput.substring(0,textOutput.length-1)}`;
//                     break;
//                 case '/': result = numberOne/numberTwo; break;
//                 case 'x': result = numberOne*numberTwo; break;
//                 case '-': result = numberOne - numberTwo; break;
//                 case '+': result = numberOne + numberTwo; break;
//                 default: result = 0;
//             }
//         }
//         textOutput = textOutput + operator;
//         calcOutput.innerHTML = `${textOutput}`;
//         result = result + operator;
//         // if (number === '='){calcOutput.innerHTML = `${result}`}
//     };
//     item.addEventListener('click', addText);
//
// });

// switch(operator){
//     case '/': result = numberOne/numberTwo; break;
//     case 'x': result = numberOne*numberTwo; break;
//     case '-': result = numberOne - numberTwo; break;
//     case '+': result = numberOne + numberTwo; break;
// }
// console.log(result);
// let calcNumbersArray = [],
//     calcOperatorsArray = [];
// calcNumbersArray.concat(calcNumbers);
// calcOperatorsArray.concat(calcOperators);
// calcNumbersArray.every(console.log);