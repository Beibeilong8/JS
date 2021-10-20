const cells = document.querySelectorAll('.cells');
let i = 0;
for(let item of cells){
    item.setAttribute('id', i);
    i++;
}
cells.forEach((item) => {
    // item.addEventListener('load', checkStorage);
    item.addEventListener('click', borderUp );
    item.addEventListener('dblclick', editCell);
    item.addEventListener('change', saveText);
});
window.addEventListener('load', updatePage);
window.addEventListener('click', savePage);
function savePage() {
    // localStorage.setItem('page', JSON.stringify(html))
}
function updatePage() {

}

function borderUp(event) {
    event.target.style.cursor = 'default';
    event.target.readOnly = true;
    event.preventDefault();
    cells.forEach( (item) => {
        item.classList.remove('bolder')
    });
    event.target.parentElement.classList.add('bolder');
}
function editCell(event) {
    event.target.readOnly = false;
}
let item = {};
function saveText(event) {
    // console.dir(event.target);
    event.target.parentElement.classList.add('yellow');
    event.target.readOnly = false;
    let date = new Date;
    // let dateParse = Date.parse(date);
    let parentID = event.target.parentElement.getAttribute('id');
    // let value = event.target.value;
    // console.dir(event.target);
    // let item = {
    //     date: JSON.stringify(dateParse),
    //     value: value,
    // };
    localStorage.setItem(parentID, JSON.stringify(Date.parse(date)));
}
function timer(){
    setInterval(checkTimer, 1000)
}
function checkTimer(){
    for(let i of cells){
        // console.log(JSON.parse(localStorage.getItem(i.id)));
        // console.log(validDate);
        // console.dir(i)
        let newDate = new Date;
        let validDate = Date.parse(newDate) - 10000;
        // let itemDate = i.id[date];
        // console.log(itemDate);
        // if(JSON.parse(localStorage.getItem(i.id[date]) == null)){
        //     return
        // }
        // console.log(localStorage.getItem(i.id));


        if (JSON.parse(localStorage.getItem(i.id))<validDate) {
            i.children[0].style.background = 'transparent';
            localStorage.removeItem(i.id);
            // console.log(JSON.parse(localStorage.getItem(i.id)))
        }

        // console.log(JSON.parse(localStorage.getItem(i.id)))
    }
}
timer();