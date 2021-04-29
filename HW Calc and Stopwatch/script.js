let calcNumbers = document.querySelectorAll('.calc-numbers'),
    calcOperators = document.querySelectorAll('.calc-operators'),
    calcOutput = document.querySelector('.calc-output'),
    number,
    textOutput = '',
    result = 0;
calcNumbers.forEach((item,index,array) =>{
    let addText = () => {
        number = +item.id;
        if (number === 'comma'){number = ',';}
        textOutput = textOutput + number;
        calcOutput.innerHTML = `${textOutput}`;
        result = result + number;
    };
    item.addEventListener('click', addText);
});
calcOperators.forEach((item,index,array) =>{
    let addText = () => {
        number = item.id;
        if (number === 'delete' || number === 'c'){
            calcOutput.innerHTML = '';
            textOutput = '';
            result = 0;
            return}
        textOutput = textOutput + number;
        calcOutput.innerHTML = `${textOutput}`;
        result = result + number;
        if (number === '='){calcOutput.innerHTML = `${result}`};
    };
    item.addEventListener('click', addText);

});
console.log(result);
// let calcNumbersArray = [],
//     calcOperatorsArray = [];
// calcNumbersArray.concat(calcNumbers);
// calcOperatorsArray.concat(calcOperators);
// calcNumbersArray.every(console.log);