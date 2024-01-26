import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

const appSettings = {
    databaseURL: 'https://we-are-the-champions-db846-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

const formEl = document.querySelector('.form');
const msgInputEl = document.querySelector('#message-input');
const publishBtn = document.querySelector('.form__btn');
const endorsementsEl = document.querySelector('.endorsements');

publishBtn.addEventListener('click', () => {
    addEndorsement(msgInputEl.value);
    clearInputEl();
});

formEl.addEventListener('submit', () => {
    addEndorsement(msgInputEl.value);
    clearInputEl();
});

const addEndorsement = (input) => {
    push(endorsementsInDB, input);
};

const clearInputEl = () => {
    msgInputEl.value = '';
};