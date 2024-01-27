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
const fromInputEl = document.querySelector('#from-input');
const toInputEl = document.querySelector('#to-input');
const publishBtn = document.querySelector('.form__btn');
const endorsementsEl = document.querySelector('.endorsements');

let endorsementObj = {
    from: '',
    to: '',
    message: ''
};

publishBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addEndorsement();
    clearInputEl();
});

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    addEndorsement();
    clearInputEl();
});

const addEndorsement = () => {
    endorsementObj = {
        ...endorsementObj,
        from: fromInputEl.value,
        to: toInputEl.value,
        message: msgInputEl.value
    }
    console.log(endorsementObj);
    push(endorsementsInDB, endorsementObj);
};

const clearInputEl = () => {
    msgInputEl.value = '';
    fromInputEl.value = '';
    toInputEl.value = '';
};

onValue(endorsementsInDB, (snapshot) => {
    if (snapshot.exists()) {
        let endorsementsArr = Object.entries(snapshot.val()).reverse();
        console.log(endorsementsArr);
    } else {
        endorsementsEl.innerHTML += 'No endorsements here... yet';
    }
});