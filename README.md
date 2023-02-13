# Frontend Mentor - Galeria slideshow site solution

This is a solution to the [Galeria slideshow site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6/hub). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge
Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate the slideshow and view each painting in a lightbox

### Screenshots

![ScreenShot1](https://github.com/MSagdieva/FMChallenge---Galeria/blob/main/screenshotGallery.png)
![ScreenShot2](https://github.com/MSagdieva/FMChallenge---Galeria/blob/main/screenshotGallery2.png)
![ScreenShot3](https://github.com/MSagdieva/FMChallenge---Galeria/blob/main/screenshotGallery5.png)
![ScreenShot4](https://github.com/MSagdieva/FMChallenge---Galeria/blob/main/screenshotGallery3.png)
![ScreenShot5](https://github.com/MSagdieva/FMChallenge---Galeria/blob/main/screenshotGallery4.png)


### Links

- Solution URL: [Solution](https://github.com/MSagdieva/FMChallenge---Galeria)
- Live Site URL: [Live Site](https://fmc-hallenge-galeria.vercel.app/)

## My process
```js
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

```

### Built with

- JS for fetching and parsing data
- Semantic HTML5 markup
- CSS custom properties
- Grid and flexbox layouts for masonry design

### Useful resources
- [JS guidebook](https://learn.javascript.ru/)
- [CSS reference book](https://cssreference.io/)
- [HTML reference book](https://htmlreference.io/)
- [FlexBox layout Cheatsheet](https://flexbox.help/)
- [Grid layout Cheatsheet](https://grid.layoutit.com/)

## Author

- GitHub - [@MSagdieva](https://github.com/MSagdieva/)
- Frontend Mentor - [@MSagdieva](https://www.frontendmentor.io/profile/MSagdieva)
- Email - [sagdieva.mariana@gmail.com](https://mailto:sagdieva.mariana@gmail.com)
- Telegram - [@it_maris](https://t.me/@it_maris)
