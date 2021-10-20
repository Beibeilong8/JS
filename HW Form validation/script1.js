const myForm = document.forms[0];
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
    } else if (!checkType(fileType)) {
        addText(errorFile, 'Файл должен быть только картинкой');
        fileTrue = false;
    } else if(!checkSize(fileSize)) {
        addText(errorFile, 'Файл не должен быть больше 1Мб');
        fileTrue = false;
    } else{
        errorFile.innerHTML = '';
        fileTrue = true;
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
    item.addEventListener('change', (event) => checkCheckbox(item));
});
function checkCheckbox(item){
        (item.checked) ? checkedCheckbox ++ : checkedCheckbox --;
        if (checkedCheckbox === 0){
            addText(errorCheck, 'Должен быть выбран хотя бы один пункт');
        } else{
            errorCheck.innerHTML = '';
        }
}
myForm.addEventListener('submit', (event) => checkForm(myForm), false);
function checkForm(myForm){
    if(fileTrue === false){
        if (errorFile.innerHTML === '') {
            addText(errorFile, 'Должен быть выбран файл');
        }
        event.preventDefault();
    } else if(checkedCheckbox === 0){
        if(errorCheck.innerHTML === '') {
            addText(errorCheck, 'Должен быть выбран хотя бы один пункт');
        }
        event.preventDefault();
    } 
}
