import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

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
const endorsementListEl = document.querySelector('.endorsements__list');

let endorsementObj = {
    from: '',
    to: '',
    message: '',
    likes: 0
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
    if (msgInputEl.value === '' || fromInputEl.value === '' || toInputEl.value === '') {
        alert('Please fill out all input fields before publishing');
    } else {
        endorsementObj = {
            ...endorsementObj,
            from: fromInputEl.value,
            to: toInputEl.value,
            message: msgInputEl.value
        }
        console.log(endorsementObj);
        push(endorsementsInDB, endorsementObj);
    }
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

        clearEndorsementListEl();

        endorsementsArr.forEach((item) => {
            renderEndorsement(item);
        });

        document.addEventListener('click', (e) => {
            if (e.target.dataset.like) {
                const targetEndoesementArr = endorsementsArr.filter(endorsement => endorsement[0] === e.target.dataset.like)[0];

                targetEndoesementArr[1].likes++;

                clearEndorsementListEl();

                endorsementsArr.forEach((item) => {
                    renderEndorsement(item);
                });
            }
        });
    } else {
        endorsementListEl.innerHTML += 'No endorsements here... yet';
    }
});

const clearEndorsementListEl = () => {
    endorsementListEl.innerHTML = '';
};

const renderEndorsement = (item) => {
    const itemID = item[0];
    const itemValue = item[1];

    endorsementListEl.innerHTML += `
        <div class="endorsement">
            <p class="endorsement__name">To ${itemValue.to}</p>
            <p class="endorsement__msg">${itemValue.message}</p>
            <div class="endorsement__footer">
                <p class="endorsement__name">From ${itemValue.from}</p>
                <p class="endorsement__likes">
                    <i class="fa-solid fa-heart" data-like="${itemID}"></i>
                    <span id="likes-${itemID}">${itemValue.likes}</span>
                </p>
            </div>
        </div>
    `;
};