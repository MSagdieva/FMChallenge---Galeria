// fetching info for description
const body=document.body;
const galleryImage=document.querySelectorAll(".gallery__image");
let PicsNames=document.querySelectorAll(".painting__name");
let PicsAuthor=document.querySelectorAll(".painting__author");
let modal=document.querySelector(".modal-one");
let modal_content=document.querySelector(".modal-one .modal-one__content");
let modal_close=document.querySelector(".modal-one .close-button");
let startSlideShow=document.querySelector(".start-button");
let next=document.querySelector(".next-button");
let back=document.querySelector(".back-button");
let slide1=0;
let pictures=[];
modal_close.addEventListener("click", ()=>{
            modal.classList.remove('active');
        });

function slide(i, pics){
            body.style.overflow="hidden";
            slide1=i;
            modal_content.innerHTML = 
            "<img class='big_image' src="+pics[i].images.gallery+">";
            modal.classList.add('active');
        }

fetch('data/data.json')
    .then(response => {return response.json()})
    .then(pics=>{
        for(let i=0;i<pics.length;i++){
        PicsNames[i].insertAdjacentText("beforeend", pics[i].name);
        PicsAuthor[i].insertAdjacentText("beforeend", pics[i].artist.name);
        galleryImage[i].addEventListener('click',()=>{
            body.style.overflow="hidden";
            modal_content.innerHTML = "<h3>"+pics[i].name+"</h3>"+"<p>"+pics[i].artist.name+"</p><div>"+
            "<span>"+pics[i].year+"</span>"+
            pics[i].description+"</div>"+
            "<div class='img_container'><img class='author_pics' src="+pics[i].artist.image+">"+
            "<img class='big_image_with_desc' src="+pics[i].images.gallery+"></div>";
            modal.classList.add('active');
        next.addEventListener('click',slide.bind(null,slide1+1, pics));
        back.addEventListener('click',slide.bind(null,slide1-1, pics));
        });

        startSlideShow.addEventListener('click',slide.bind(null, 0, pics));
}
})  .then(function(json){pictures=json})     
    .catch(error=>{console.log(error.data)});