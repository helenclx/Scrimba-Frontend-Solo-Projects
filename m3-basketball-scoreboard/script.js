const homeScoreEl = document.querySelector('#home-score');
const guestScoreEl = document.querySelector('#guest-score');

const homeAddScoreBtns = document.querySelectorAll('.team__btn.home-btn');
const guestAddScoreBtns = document.querySelectorAll('.team__btn.guest-btn');

let homeScore = 0;
let guestScore = 0;

homeAddScoreBtns.forEach((btn, i) => {
    const scoreAdded = i + 1;
    btn.addEventListener('click', () => {
        homeScore += scoreAdded;
        homeScoreEl.textContent = homeScore;
    });
});

guestAddScoreBtns.forEach((btn, i) => {
    const scoreAdded = i + 1;
    btn.addEventListener('click', () => {
        guestScore += scoreAdded;
        guestScoreEl.textContent = guestScore;
    });
});