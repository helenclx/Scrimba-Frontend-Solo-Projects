import { posts } from './data.js'

const navbarToggle = document.querySelector('.navbar__toggle');
const navbarList = document.querySelector(".navbar__list");
const navbarLinks = document.querySelectorAll('.navbar__link');

navbarToggle.addEventListener('click', () => {
    navbarList.classList.toggle("navbar-list-show");
});

navbarLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navbarList.classList.remove("navbar-list-show");
    });
});

let startingPostIndex = 0;
let endingPostIndex = 3;

const renderPosts = (posts) => {
    posts.forEach(({mainImg, date, title, summary}) => {
        document.querySelector('.posts').innerHTML += `
            <article class="post">
                <img src="${mainImg}" class="post__main-img" alt="Main image of ${title}">
                <p class="post__date">${date}</p>
                <h3 class="post__title">${title}</h3>
                <p class="post__summary">${summary}</p>
            </article>
        `;
    });
};
renderPosts(posts.slice(startingPostIndex, endingPostIndex));