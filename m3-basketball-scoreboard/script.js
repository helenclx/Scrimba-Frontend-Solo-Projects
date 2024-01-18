const homeScoreEl = document.querySelector('#home-score');
const guestScoreEl = document.querySelector('#guest-score');

const homeAddScoreBtns = document.querySelectorAll('.team__btn.home-btn');
const guestAddScoreBtns = document.querySelectorAll('.team__btn.guest-btn');
const newGameBtn = document.querySelector('.new-game-btn');

let homeScore = 0;
let guestScore = 0;

homeAddScoreBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        homeScore += i + 1;
        homeScoreEl.textContent = homeScore;
    });
});

guestAddScoreBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        guestScore += i + 1;
        guestScoreEl.textContent = guestScore;
    });
});

newGameBtn.addEventListener('click', () => {
    homeScore = 0;
    homeScoreEl.textContent = 0;
    guestScore = 0;
    guestScoreEl.textContent = 0;
});