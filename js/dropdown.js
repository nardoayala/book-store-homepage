const ipad = window.matchMedia('screen and (max-width: 767px)')
const burgerButton = document.getElementById('burguer-button')
const responsiveMenu = document.getElementById('responsive-menu')

ipad.addListener(validation)

function validation(event) {
    if (event.matches) {
        console.log(event)
        burgerButton.addEventListener('click', hideShow)
    }else {
        console.log(event)
        burgerButton.removeEventListener('click', hideShow)
      }
}

validation(ipad) 

function hideShow() {
    responsiveMenu.classList.toggle('is-active')
}