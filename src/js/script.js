// fetching info for description
let PicsNames=document.querySelectorAll(".painting__name");
let PicsAuthor=document.querySelectorAll(".painting__author");
fetch('data/data.json')
    .then(response => response.json())
    .then(pics=>{
        for(let i=0;i<pics.length;i++){
        PicsNames[i].insertAdjacentText("beforeend", pics[i].name);
        PicsAuthor[i].insertAdjacentText("beforeend", pics[i].artist.name);
    }
})       
    .catch(error=>{console.log(error.data)});