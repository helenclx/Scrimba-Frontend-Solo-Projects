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