function loadImages(n) {
  const container = document.getElementsByClassName('container')[0];
    for (let i = 1; i <= n; i++) {
      const image = document.createElement('img');
      image.setAttribute('src', `./photos/${i}.jpg`)
      image.setAttribute('class', `parallax`)
      container.appendChild(image)
    }  
}