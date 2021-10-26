// fetching info for description
let PicsNames=document.querySelectorAll(".painting__name");
let PicsAuthor=document.querySelectorAll(".painting__author");
let modal=document.querySelector(".modal-one");
let modal_content=document.querySelector(".modal-one .modal-one__content");
let modal_close=document.querySelector(".close-button");
modal_close.addEventListener("click", ()=>{
            modal.classList.remove('active');
        });

fetch('data/data.json')
    .then(response => response.json())
    .then(pics=>{
        for(let i=0;i<pics.length;i++){
        PicsNames[i].insertAdjacentText("beforeend", pics[i].name);
        PicsAuthor[i].insertAdjacentText("beforeend", pics[i].artist.name);
        PicsNames[i].addEventListener('click',()=>{
            modal_content.innerHTML = "<h3>"+pics[i].name+"</h3><div>"+pics[i].description+"</div>"+
            "<img src="+pics[i].artist.image+">"+
            "<img class='large-picture' src="+pics[i].images.gallery+">";
            modal.classList.add('active');
        });

}
})       
    .catch(error=>{console.log(error.data)});

