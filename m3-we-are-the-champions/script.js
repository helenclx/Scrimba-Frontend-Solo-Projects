import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js'

const appSettings = {
    databaseURL: 'https://we-are-the-champions-db846-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = ref(database, "endorsements");