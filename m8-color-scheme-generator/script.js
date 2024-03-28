// API documentation: https://www.thecolorapi.com/docs#schemes

const formEl = document.querySelector('.form');
const seedColorEl = document.querySelector('.form__seed-color');
const colorScemeEl = document.querySelector('.form__color-scheme');

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted');
    console.log('Seed Color:', seedColorEl.value);
    console.log('Color Scheme:', colorScemeEl.value);
})