// Import Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, push, onValue, update } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

// Set up Firebase database
const appSettings = {
    databaseURL: 'https://we-are-the-champions-db846-default-rtdb.asia-southeast1.firebasedatabase.app/'
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");

// Get DOM elements
const formEl = document.querySelector('.form');
const msgInputEl = document.querySelector('#message-input');
const fromInputEl = document.querySelector('#from-input');
const toInputEl = document.querySelector('#to-input');
const publishBtn = document.querySelector('.form__btn');
const endorsementListEl = document.querySelector('.endorsements__list');

// Initiate endorsement object
let endorsementObj = {
    from: '',
    to: '',
    message: '',
    likes: 0
};

// Form submission events
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
        push(endorsementsInDB, endorsementObj);
    }
};

const clearInputEl = () => {
    msgInputEl.value = '';
    fromInputEl.value = '';
    toInputEl.value = '';
};

// Load data from the Firebase database
onValue(endorsementsInDB, (snapshot) => {
    if (snapshot.exists()) {
        let endorsementsArr = Object.entries(snapshot.val()).reverse();

        clearEndorsementListEl();

        endorsementsArr.forEach((item) => {
            renderEndorsement(item);
        });

        // Event for when a user likes an endorsement
        document.addEventListener('click', (e) => {
            if (e.target.dataset.like) {
                const targetEndoesementArr = endorsementsArr.filter(endorsement => endorsement[0] === e.target.dataset.like)[0];

                if (!localStorage.getItem(e.target.dataset.like)) {
                    targetEndoesementArr[1].likes++;
                    localStorage.setItem(e.target.dataset.like, 'isLiked');
                    update(ref(database, `endorsements/${e.target.dataset.like}`), targetEndoesementArr[1]);

                    clearEndorsementListEl();

                    endorsementsArr.forEach((item) => {
                        renderEndorsement(item);
                    });
                }
            }
        });
    } else {
        endorsementListEl.textContent = 'No endorsements here... yet.';
    }
});

// Prevent rendering any endorsement more than once
const clearEndorsementListEl = () => {
    endorsementListEl.innerHTML = '';
};

// Render each endorsement
const renderEndorsement = (item) => {
    const itemID = item[0];
    const itemValue = item[1];

    const newEndorsementDiv = document.createElement('div');
    newEndorsementDiv.classList.add('endorsement');

    const newEndorsementTo = document.createElement('p');
    newEndorsementTo.classList.add('endorsement__name');
    newEndorsementTo.textContent = `To ${itemValue.to}`;

    const newEndorsementMsg = document.createElement('p');
    newEndorsementMsg.classList.add('endorsement__msg');
    newEndorsementMsg.textContent = itemValue.message;

    const newEndorsementFrom = document.createElement('p');
    newEndorsementFrom.classList.add('endorsement__name');
    newEndorsementFrom.textContent = `From ${itemValue.from}`;

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('endorsement__likes');
    likeBtn.ariaLabel = 'Like this endorsement message';

    const fontAwesomeIcon = document.createElement('i');
    fontAwesomeIcon.classList.add('fa-solid', 'fa-heart');
    localStorage.getItem(itemID)  === 'isLiked' && fontAwesomeIcon.classList.add('liked');
    fontAwesomeIcon.setAttribute('data-like', itemID);

    const likeCountEl = document.createElement('span');
    likeCountEl.id = `likes-${itemID}`;
    likeCountEl.textContent = ` ${itemValue.likes}`;

    likeBtn.append(fontAwesomeIcon, likeCountEl);

    endorsementListEl.append(newEndorsementDiv);
    newEndorsementDiv.append(newEndorsementTo, newEndorsementMsg, newEndorsementFrom, likeBtn);
};