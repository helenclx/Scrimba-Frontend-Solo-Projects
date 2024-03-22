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

const getPostsHTML = () => {
    let postsHTML = '';

    posts.forEach((post) => {
        postsHTML += `
            <article class="post">
                <img src="${post.mainImg}" class="post__main-img" alt="Main image of ${post.title}">
                <p class="post__date">${post.date}</p>
                <h3 class="post__title">${post.title}</h3>
                <p class="post__summary">${post.summary}</p>
            </article>
        `;
    });

    return postsHTML;
};

const renderPosts = () => {
    document.querySelector('.posts').innerHTML = getPostsHTML();
};
renderPosts();