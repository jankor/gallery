function loadImages(n) {
  const container = document.getElementsByClassName('container')[0];
  const pixelRation = window.devicePixelRatio || 1;
  const screenWidth = window.screen.width || 2048;    
  const loadSQ = screenWidth * pixelRation <= 1125; // iphone width
    for (let i = 1; i <= n; i++) {
      const image = document.createElement('img');
      image.setAttribute('src', `./photos/${loadSQ ? i+'-1080' : i}.jpg`)
      image.setAttribute('class', `parallax`)
      container.appendChild(image)
    }  
}

const preloader = document.querySelector('.preloader');
let triggered = false;

function fadeEffect() {
  if (triggered) return;
  triggered = true;
  const fadeInterval = setInterval(() => {
  // if we don't set opacity 1 in CSS, then
  // it will be equaled to "" -- that's why
  // we check it, and if so, set opacity to 1
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
  }
  if (preloader.style.opacity > 0) {
    preloader.style.opacity -= 0.1;
  } else {    
    clearInterval(fadeInterval);    
    preloader.parentNode.removeChild(preloader);
    const image = document.getElementsByClassName('parallax');
    new simpleParallax(image, {
      orientation: 'up',
      scale: 1.1})
  }
}, 100);
}

window.addEventListener('load', fadeEffect);
setTimeout(fadeEffect, 8000);