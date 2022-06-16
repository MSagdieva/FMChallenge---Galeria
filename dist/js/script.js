// fetching info for description
const body=document.body;
const galleryImage=document.querySelectorAll(".gallery__image");
const picsNames=document.querySelectorAll(".painting__name");
const picsAuthor=document.querySelectorAll(".painting__author");
const modal=document.querySelector(".modal-one");
const modal_one_content=document.querySelector(".modal-one .modal-one__content");
const modal_two_content=document.querySelector(".modal-two .modal-two__content");
const modal_close=document.querySelector(".modal-one .close-button");
const modal2=document.querySelector(".modal-two");
const startSlideShow=document.querySelector(".start-button");
const next=document.querySelector(".next-button");
const back=document.querySelector(".back-button");
const paintName = document.querySelector(".footer-painting_name");
const artName = document.querySelector(".footer-artist_name");
let slideNumber=0;
let nextSlide=1;
let prevSlide=14;
let pictures=[];
let names=[];

modal_close.addEventListener("click", ()=>{
                modal.classList.remove('active');
            });

function imageInfoSlide(i, pictures){
        body.style.overflow="hidden";
        modal_one_content.innerHTML = pictures[i];
        modal.classList.add('active');
        nextBackChange();
        checkInactiveButton(i);
        }

function checkInactiveButton(i){
        if (i==0){
            back.classList.add('inactive');
        }
        else{
            back.classList.remove('inactive');
        }
        if (i==14){
            next.classList.add('inactive');
        }
        else{
            next.classList.remove('inactive');
        }
    }

function nextBackChange(){
        next.addEventListener('click',()=>{
            if(slideNumber!==14){
                modal_one_content.innerHTML = pictures[nextSlide];
                prevSlide=numberChange(slideNumber, 0, 14);
                slideNumber=nextSlide;
                nextSlide=numberChange(nextSlide+1, 0, 14);
                checkInactiveButton(slideNumber);
                pictNameArtNameChange(slideNumber);
                setAdditionalPaintingData(slideNumber);
            }
        });
        back.addEventListener('click',()=>{
            if(slideNumber!==0){
                modal_one_content.innerHTML = pictures[prevSlide];
                nextSlide=numberChange(slideNumber, 0, 14);
                slideNumber=prevSlide;
                prevSlide=numberChange(slideNumber-1, 0, 14);
                setAdditionalPaintingData(slideNumber);
        }
        });
    }

function numberChange( number, min, max){
        if (number>max){
            return min;
        }
        else if(number<min){
            return max
        }
        else{ return number}
    }

function pictInfoFill(pic){
        return "<div class='first_column'><div class='painting_head'><h3 class='painting_name'>"+pic.name+
        "</h3>"+"<p class='artist_name'>"+pic.artist.name+"</p></div>"+
        "<div class='paint_images'><div class='img_container'><img class='big_image_with_desc' src="+pic.images.gallery+"><div class='view_image_button'><img src='/img/icons/view.svg'><span class='view'>View image</span></div></div>"+
        "<img class='author_pics' src="+pic.artist.image+"></div></div><div class='second_column'><p class='painting_description'>"+
        pic.description+
        "<span class='painting_year'>"+pic.year+"</span></p></div></div>";
    }
    
function pictNameArtNameChange(i){
        paintName.innerHTML = names[i].name;
        artName.innerHTML = names[i].artist_name;
    }

function addViewImageButton(i){
        let viewImageButton=document.querySelector('.view_image_button');
            viewImageButton.addEventListener("click", ()=>{
                modal2.classList.add('active');
                modal_two_content.innerHTML = "<img src="+names[i].image+">";
                modal2.querySelector('.close-button').addEventListener("click", ()=>{
                    modal2.classList.remove('active');
                });;
            });
    }

function setAdditionalPaintingData(i){
    checkInactiveButton(i);
    pictNameArtNameChange(i);
    addViewImageButton(i);
    }

fetch('data/data.json')
    .then(response => {return response.json()})
    .then((pics)=>{
        Array.from(pics).map((pic, i)=>{
        picsNames[i].insertAdjacentText("beforeend", pic.name);
        picsAuthor[i].insertAdjacentText("beforeend", pic.artist.name);
        pictures.push(pictInfoFill(pic));
        names.push({"name": pic.name,"artist_name": pic.artist.name, "image":pic.images.hero.large});
        galleryImage[i].addEventListener('click',()=>{
            slideNumber=i;
            nextSlide=i+1;
            prevSlide=i-1;
            imageInfoSlide(i, pictures);
            setAdditionalPaintingData(i);
        });
    })
        startSlideShow.addEventListener('click',()=>{imageInfoSlide(0, pictures);});
        checkInactiveButton(0);
        pictNameArtNameChange(0);
        addViewImageButton(0);
})    
    .catch(error=>{console.log(error)});
