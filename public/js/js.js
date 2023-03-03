

const displayBox = document.querySelector('.display-wrapper')
const displaySlide = document.querySelector('.display-slide')
const left = document.getElementsByClassName('scroll-buttons-left')
const right = document.getElementsByClassName('scroll-buttons-right')

const scrollWidth = displaySlide.clientWidth

console.log(scrollWidth)

const mouseClickLeft = (e) => {

    displayBox.scrollLeft -= scrollWidth
}

const mouseClickRight = (e) => {

    displayBox.scrollLeft += scrollWidth
}


document.querySelector(".scroll-buttons-left").addEventListener("click", mouseClickLeft);

document.querySelector(".scroll-buttons-right").addEventListener("click", mouseClickRight);