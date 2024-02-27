import menuArray from './data.js'

const menuEl = document.querySelector('.menu');
const orderEl = document.querySelector('.order');
const totalPriceEl = document.querySelector('.order__total--price');
const orderSubmitBtn = document.querySelector('.order__submit-btn');
const modealEl = document.querySelector('.modal');
const modalFormEl = document.querySelector('.modal__form');
const cardNameInput = document.getElementById('card-name-input');
const cardNumInput = document.getElementById('card-number-input');
const cardCvvInput = document.getElementById('card-cvv-input');