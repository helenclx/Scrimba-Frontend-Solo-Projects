import menuArray from './data.js'

const menuEl = document.querySelector('.menu');
const orderEl = document.querySelector('.order');
const orderListEl = document.querySelector('.order__list');
const totalPriceEl = document.querySelector('.order__total--price');
const orderSubmitBtn = document.querySelector('.order__submit-btn');
const modalEl = document.querySelector('.modal');
const modalFormEl = document.querySelector('.modal__form');
const cardNameInput = document.getElementById('card-name-input');
const cardNumInput = document.getElementById('card-number-input');
const cardCvvInput = document.getElementById('card-cvv-input');

let orderedItems = [];
let totalPrice = 0;

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

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        orderEl.classList.remove('hidden');

        menuArray.forEach(item => {
            if (item.id === Number(e.target.dataset.add)) {
                orderedItems.push(item);
                totalPrice += item.price;
                console.log("Ordered items: ", orderedItems);
                console.log("Total price: ", totalPrice);
                renderOrderItem(item.name, item.price);
            }
        });
    }
});

const renderOrderItem = (name, price) => {
    orderListEl.innerHTML += `
        <div class="order__item">
            <h3 class="order__food">${name}</h3>
            <button class="order__remove-btn">Remove</button>
            <p class="order__price">$${price}</p>
        </div>
    `;

    totalPriceEl.textContent = `$${totalPrice}`;
};

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

const clearSubmitModalForm = () => {
    cardNameInput.value = '';
    cardNumInput.value = '';
    cardCvvInput.value = '';
};

modalFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    submitModalForm();
    clearSubmitModalForm();
});