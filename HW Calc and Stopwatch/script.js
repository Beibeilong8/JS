let
    // calcNumbers = document.querySelectorAll('.calc-numbers'),
    // calcOperators = document.querySelectorAll('.calc-operators'),
    calcOutput = document.querySelector('.calc-output'),
    thAll = document.querySelectorAll('th'),
    number = 0,
    numberOne = 0,
    numberTwo = 0,
    textOutput = '',
    result = 0,
    operator = '',
    operators = [''],
    allItems = [''],
    textLength;
thAll.forEach((item) =>{
    let addText = function(){
        let className = item.className;

        if(className === 'calc-numbers'){
            number = this.dataset.id;
            if (number === 'comma'){number = ','}
            numberOne = "numberOne" + number;
            allItems.push(number);
            textOutput = textOutput + number;
            calcOutput.innerHTML = `${textOutput}`;

        }

        if(className === 'calc-operators'){

            operator = this.dataset.id;
            operators.push(operator);
            allItems.push(operator);
            console.log(allItems);
            console.log(operators);

            if(operator === 'c'){
                calcOutput.innerHTML = '';
                textOutput = '';
                result = 0;
                operators = [''];
                allItems = [''];
                return;
            }

            if(operator === 'delete'){
                textLength = textOutput.length -1;
                calcOutput.innerHTML = `${textOutput.substring(0,textLength)}`;
                textOutput.length = textOutput.length - 1;
                console.log(textOutput.length);
                return
                }

            textOutput = textOutput + operator;
            calcOutput.innerHTML = `${textOutput}`;

            if (operator === '='){
                operators.forEach(() => {switch(item) {
                    case '/':
                        result = numberOne / numberTwo;
                        break;
                    case 'x':
                        result = numberOne * numberTwo;
                        break;
                    case '-':
                        result = numberOne - numberTwo;
                        break;
                    case '+':
                        result = numberOne + numberTwo;
                        break;
                    default:
                        result = 0;
                }});
                operators = [''];
                allItems = [result];
                textOutput = textOutput + result;
                calcOutput.innerHTML = `${textOutput}`;
            }

        }


        // textOutput = numberOne + operator + numberTwo;
        // calcOutput.innerHTML = `${textOutput}`;

        // result = result + operator;
        // if (number === '='){calcOutput.innerHTML = `${result}`}
    };


    item.addEventListener('click', addText);
})


calcOutput.innerHTML = `${textOutput.substring(0, textOutput.length - 1)}`;


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