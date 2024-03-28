// API documentation: https://www.thecolorapi.com/docs#schemes

const formEl = document.querySelector('.form');
const seedColorEl = document.querySelector('.form__seed-color');
const colorScemeEl = document.querySelector('.form__color-scheme');
const resultsContainer = document.querySelector('.results');

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Form submitted');
    console.log('Seed Color:', seedColorEl.value);
    console.log('Color Scheme:', colorScemeEl.value);

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColorEl.value.slice(1)}&mode=${colorScemeEl.value}`)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = '';

            data.colors.forEach(color => {
                const colorHexValue = color.hex.value;

                const newResult = document.createElement('div');
                newResult.classList.add('result');

                const newResultColor = document.createElement('div');
                newResultColor.classList.add('result__color');
                newResultColor.style.backgroundColor = colorHexValue;

                const newResultValue = document.createElement('p');
                newResultValue.classList.add('result__value');
                newResultValue.textContent = colorHexValue;

                resultsContainer.append(newResult);
                newResult.append(newResultColor);
                newResult.append(newResultValue);
            })
        })
})