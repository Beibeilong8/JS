let myForm = document.forms[0];
const file = myForm.elements.file;
const errorFile = document.getElementById('errorFile');
const fileCheckPattern = /image/;
const maxFileSize = '1000000';
const checkbox = myForm.elements.check;
const checkboxArray = new Array(...checkbox);
const errorCheck = document.getElementById('errorCheck');
let checkedCheckbox = 0;
let fileTrue = false;

//---------------------------------------------File--------------------------------------
file.addEventListener('input', checkFile);
function checkFile() {
    let fileType = file.files[0].type;
    let fileSize = file.files[0].size;
    if(!checkType(fileType) && !checkSize(fileSize)){
        addText(errorFile, 'Файл не должен быть больше 1Мб и должен быть только картинкой');
        fileTrue = false;
        return false;
    } else if (!checkType(fileType)) {
        addText(errorFile, 'Файл должен быть только картинкой');
        fileTrue = false;
        return false;
    } else if(!checkSize(fileSize)) {
        addText(errorFile, 'Файл не должен быть больше 1Мб');
        fileTrue = false;
        return false;
    } else{
        errorFile.innerHTML = '';
        fileTrue = true;
        return true;
    }
}
function addText(elem, text){
    elem.innerHTML = `${text}`;
}
function checkType(fileType){
    if(fileCheckPattern.test(fileType)){
        return true;
    }
}
function checkSize(fileSize){
    if(fileSize <= maxFileSize){
        return true;
    }
}
//---------------------------------------------Checkbox--------------------------------------
checkboxArray.forEach((item) => {
    function checkCheckbox(){
        (item.checked) ? checkedCheckbox ++ : checkedCheckbox --;
        if (checkedCheckbox === 0){
            // errorCheck.innerHTML = 'Должен быть выбран хотя бы один пункт';
            addText(errorCheck, 'Должен быть выбран хотя бы один пункт');
            return false;
        } else{
            errorCheck.innerHTML = '';
            return true;
        }
    }
    item.addEventListener('change', checkCheckbox);
});
// myForm.addEventListener('submit', function () {
//     if(!fileTrue){
//         event.preventDefault();
//         (errorFile.innerHTML === '') ? errorFile.innerHTML = 'Должен быть выбран файл' : '';
//     }
//     if(!checkTrue){
//         event.preventDefault();
//         (errorCheck.innerHTML === '') ? errorCheck.innerHTML = 'Должен быть выбран хотя бы один пункт' : '';
//     }
//     myForm.submit;
// });
myForm.addEventListener('submit', checkForm);
function checkForm(myForm){

// myForm.onsubmit = function(){

    console.log(fileTrue);
    console.log(checkedCheckbox);
    if((fileTrue === true)&&(checkedCheckbox !== 0)){
        // myForm.onsubmit();
        console.log('true');
        return;

    }
    if(fileTrue === false){
        if (errorFile.innerHTML === '') {
            addText(errorFile, 'Должен быть выбран файл');
        }
        myForm.preventDefault();

    } else if(checkedCheckbox === 0){
        // event.preventDefault();
        if(errorCheck.innerHTML === '') {
            addText(errorCheck, 'Должен быть выбран хотя бы один пункт');
        }
        myForm.preventDefault();
        // event.preventDefault();
        // return false
    }

    // return false
    // console.log(event.preventDefault())
    // if (!(!checkFile || !(checkedCheckbox === 0))) return;

}