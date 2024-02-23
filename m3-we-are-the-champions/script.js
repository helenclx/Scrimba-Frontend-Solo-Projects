import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, push, onValue, update } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

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
        console.log('Entered endorsement:', endorsementObj);
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
        console.log('Endorsements array:', endorsementsArr);

        clearEndorsementListEl();

        endorsementsArr.forEach((item) => {
            renderEndorsement(item);
        });

        document.addEventListener('click', (e) => {
            if (e.target.dataset.like) {
                let targetEndoesementArr = [];
                endorsementsArr.forEach(endorsement => {
                    if (endorsement[0] === e.target.dataset.like) {
                        targetEndoesementArr = endorsement;
                    }
                });

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
        endorsementListEl.textContent = 'No endorsements here... yet';
    }
});

const clearEndorsementListEl = () => {
    endorsementListEl.innerHTML = '';
};

const renderEndorsement = (item) => {
    const itemID = item[0];
    const itemValue = item[1];

    let likedClass = '';
    if (localStorage.getItem(itemID) === 'isLiked') {
        likedClass = 'liked';
    }

    // endorsementListEl.innerHTML += `
    //     <div class="endorsement">
    //         <p class="endorsement__name">To ${itemValue.to}</p>
    //         <p class="endorsement__msg">${itemValue.message}</p>
    //         <div class="endorsement__footer">
    //             <p class="endorsement__name">From ${itemValue.from}</p>
    //             <button class="endorsement__likes" aria-label="Like this endorsement">
    //                 <i class="fa-solid fa-heart ${likedClass}" data-like="${itemID}"></i>
    //                 <span id="likes-${itemID}">${itemValue.likes}</span>
    //             </button>
    //         </div>
    //     </div>
    // `;

    const newEndorsementDiv = document.createElement('div');
    newEndorsementDiv.classList.add('endorsement');

    const newEndorsementTo = document.createElement('p');
    newEndorsementTo.classList.add('endorsement__name');
    newEndorsementTo.textContent = `To ${itemValue.to}`;

    const newEndorsemenFooter = document.createElement('div');
    newEndorsemenFooter.classList.add('endorsement__footer');

    const newEndorsementMsg = document.createElement('p');
    newEndorsementMsg.classList.add('endorsement__msg');
    newEndorsementMsg.textContent = itemValue.message;

    const newEndorsementFrom = document.createElement('p');
    newEndorsementFrom.classList.add('endorsement__name');
    newEndorsementFrom.textContent = `From ${itemValue.from}`;

    endorsementListEl.append(newEndorsementDiv);
    newEndorsementDiv.append(newEndorsementTo);
    newEndorsementDiv.append(newEndorsementMsg);

    newEndorsementDiv.append(newEndorsemenFooter);
    newEndorsemenFooter.append(newEndorsementFrom);

    newEndorsemenFooter.innerHTML += `
        <button class="endorsement__likes" aria-label="Like this endorsement">
            <i class="fa-solid fa-heart ${likedClass}" data-like="${itemID}"></i>
            <span id="likes-${itemID}">${itemValue.likes}</span>
        </button>
    `;
};