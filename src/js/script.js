// slideShow management
// body anchor
const body=document.body;
// document width
const docElWidth = document.documentElement.clientWidth;
// modal footer before element
const modalFooterIndicator = document.querySelector(".modal_footer-indicator");
// all images on main page
const galleryImage=document.querySelectorAll(".gallery__image");
// painting names
const picsNames=document.querySelectorAll(".painting__name");
// painting authors
const picsAuthor=document.querySelectorAll(".painting__author");

// modal one objects
//--------------------------------------------------
// painting info modal window
const modal=document.querySelector(".modal-one");
const modal_one_content=document.querySelector(".modal-one .modal-one__content");
// modal one painting name
const paintName = document.querySelector(".footer-painting_name");
// modal two painting name
const artName = document.querySelector(".footer-artist_name");
// close button
const modal_close=document.querySelector(".modal-one .close-button");

// slider objects
// --------------------------
// start button
const startSlideShow=document.querySelector(".start-button");
// next button
const next=document.querySelector(".next-button");
// previous button
const back=document.querySelector(".back-button");
// --------------------------
// ----------------------------------------------------

// modal two objects
// ----------------------------------------------------
// painting image modal window
const modal2=document.querySelector(".modal-two");
const modal_two_content=document.querySelector(".modal-two .modal-two__content");
// ----------------------------------------------------

// slider variations
// current slide number
let slideNumber=0;
// next slide number
let nextSlide=1;
// previous slide number
let prevSlide=14;
// paintings info array
let pictures=[];
// paitings names array
let names=[];

// function fetching info for description
function fetchInfoForDescription(){
// get data
fetch('data/data.json')
    // return json data
    .then(response => {return response.json()})
    // get paintings data
    .then((pics)=>{
        // assignment painting in arrays
        Array.from(pics).map((pic, i)=>{
            // insert painting name in name element
        picsNames[i].insertAdjacentText("beforeend", pic.name);
            // insert painting author in author element
        picsAuthor[i].insertAdjacentText("beforeend", pic.artist.name);
            // insert painting info in paintings array
        pictures.push(pictInfoFill(pic));
            // insert painting name in names array
        names.push({"name": pic.name,"artist_name": pic.artist.name, "image":pic.images.gallery});
            // add gallery images click action
        galleryImage[i].addEventListener('click',()=>{
            slideNumber=i;
            nextSlide=i+1;
            prevSlide=i-1;
            imageInfoSlide(i, pictures);
            setAdditionalPaintingData(i);
        });
    })
        // add Start slideshow click action
        startSlideShow.addEventListener('click',()=>{
            imageInfoSlide(0, pictures);
            modalFooterIndicator.style.width = `${getSliderIndicatorPosition(0)}px`;
        });
        setInactiveButtons(0);
        pictNameArtNameChange(0);
        addViewImageButton(0);
})  
    // fetching errors catch
    .catch(error=>{console.log(error)});
};

// funtion for initialization first modal, add listeners for next and back buttons, add listener for modal close
function initFirstModal(){
    nextBackChange();
    // modal close
    modal_close.addEventListener("click", ()=>{
        modal.classList.remove('active');
        body.style.overflowY="scroll";
        slideNumber=0;
        nextSlide=1;
        prevSlide=14;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// function for open slide, add modal content, call set function for next, back buttons status
function imageInfoSlide(i, pictures){
    body.style.overflow="hidden";
    modal_one_content.innerHTML = pictures[i];
    modal.classList.add('active');
    setInactiveButtons(i);
    }

// function for set next, back buttons status (inactive)
function setInactiveButtons(i){
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

// function for change painting info in modal one footer
function pictNameArtNameChange(i){
        paintName.innerHTML = names[i].name;
        artName.innerHTML = names[i].artist_name;
    }

// function for view image button click
function addViewImageButton(i){
        let viewImageButton=document.querySelector('.view_image_button');
        if (viewImageButton){ 
        viewImageButton.addEventListener("click", ()=>{
                modal2.classList.add('active');
                modal_two_content.innerHTML = "<div class='image_cont'><span class='start-button stop-button close-button'>Close</span><img class='big_image' src="+names[i].image+"></div>";
                modal2.querySelector('.close-button').addEventListener("click", ()=>{
                    modal2.classList.remove('active');
                });
            });
        }
    }
// function for change slideNumbers
function nextBackButtonActions(direction){
    if (direction==='next'){
        modal_one_content.innerHTML = pictures[nextSlide];
        prevSlide=slideNumber;
        slideNumber=nextSlide;
        nextSlide=nextSlide+1;
    }
    else{
        modal_one_content.innerHTML = pictures[prevSlide];
        nextSlide=slideNumber;
        slideNumber=prevSlide;
        prevSlide=slideNumber-1;
    }
    setAdditionalPaintingData(slideNumber);
}
    
// function for adding listeners for next and back buttons
function nextBackChange(){
        next.addEventListener('click',()=>{
            if(slideNumber!==14){
                nextBackButtonActions('next');
            }
        });
        back.addEventListener('click',()=>{
            if(slideNumber!==0){
                nextBackButtonActions('prev');
            }
        });
    }

// function for change slider indicator
function getSliderIndicatorPosition(number){
    let indicatorPosition =  Math.ceil(docElWidth/15)*(number+1)
    if (number==14)
    {
        if (docElWidth>768)
        {
            return indicatorPosition+10;
        }
        else{
            return docElWidth-1;
        }
    }
    else{
        return indicatorPosition;
    }
}

// function change number for cycling sl;ider
// function numberChange( number, min, max){  
//     if (number>max){
//             return min;
//         }
//         else if(number<min){
//             return max
//         }
//         else{ return number}
//     }

// function for filling pictures information in modal window
function pictInfoFill(pic){
        return "<div class='first_column'><div class='image_info_container'><div class='painting_head'><h3 class='painting_name'>"+pic.name+
        "</h3>"+"<p class='artist_name'>"+pic.artist.name+"</p></div>"+
        "<div class='paint_images'><div class='img_container'><img class='big_image_with_desc' src="+pic.images.hero.large+"><div class='view_image_button'><img src='/img/icons/view.svg'><span class='view'>View image</span></div></div>"+
        "<img class='author_pics' src="+pic.artist.image+"></div></div></div><div class='second_column'><p class='painting_description'>"+
        pic.description+
        "<span class='painting_year'>"+pic.year+"</span></p><a class='source_link' href='"+pic.source+"'>Go to sourse</a></div></div>";
    }

// function for set additional data for modal buttons and painting artist name
function setAdditionalPaintingData(i){
    setInactiveButtons(i);
    pictNameArtNameChange(i);
    addViewImageButton(i);
    modalFooterIndicator.style.width = `${getSliderIndicatorPosition(i)}px`;
    }

// start data fetching
fetchInfoForDescription();
// init first modal info + button info
initFirstModal();
