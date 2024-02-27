import menuArray from './data.js'

const menuEl = document.querySelector('.menu');
const orderEl = document.querySelector('.order');
const totalPriceEl = document.querySelector('.order__total--price');
const orderSubmitBtn = document.querySelector('.order__submit-btn');
const modalEl = document.querySelector('.modal');
const modalFormEl = document.querySelector('.modal__form');
const cardNameInput = document.getElementById('card-name-input');
const cardNumInput = document.getElementById('card-number-input');
const cardCvvInput = document.getElementById('card-cvv-input');
const payBtn = document.querySelector('.modal__pay-btn');

const renderMenuItem = (menu) => {
    return menu.map(item => {
        const { name, ingredients, id, price, emoji } = item;
        const ingredientsTxt = ingredients.map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()).join(', ');

        return `
            <div class="menu__food">
                <div class="menu__food--icon">${emoji}</div>
                <div class="menu__food--info">
                    <h2 class="menu__food--name">${name}</h2>
                    <p class="menu__food--ingredients">${ingredientsTxt}</p>
                    <h3 class="menu__food--price">$${price}</h3>
                </div>
                <button class="menu__food--add-btn" data-add="${id}">+</button>
            </div>
            <hr>
        `;
    }).join('');
};
menuEl.innerHTML = renderMenuItem(menuArray);

const addOrderBtns = document.querySelectorAll('.menu__food--add-btn');
addOrderBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        console.log(`Button no. ${index} clicked`);
        orderEl.classList.remove('hidden');
    });
});

orderSubmitBtn.addEventListener('click', () => {
    modalEl.classList.remove('hidden');
});

const submitModalForm = () => {
    modalEl.classList.add('hidden');

    const orderCompleteEl = document.createElement('h2');
    orderCompleteEl.classList.add('order__complete');
    orderCompleteEl.textContent = `Thanks, ${cardNameInput.value}! Your order is on its way!`
    orderEl.append(orderCompleteEl);
};

payBtn.addEventListener('click', (e) => {
    e.preventDefault();
    submitModalForm();
});

modalFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    submitModalForm();
});