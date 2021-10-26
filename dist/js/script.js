let names=[];
fetch('data/data.json')
    .then(response => response.json())
    .then(pics=>{pics.forEach(element => {
        names.push(element.name);
    });});
console.log(names);
let i = 0;
document.querySelectorAll(".painting__name").forEach(element => {
        element.insertAdjacentText("beforeend", names[4]);
    });