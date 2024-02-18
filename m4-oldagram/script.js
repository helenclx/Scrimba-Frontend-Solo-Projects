import { posts } from './data.js'

const getPostsHTML = () => {
    let postsHTML = ``;
    posts.forEach((post) => {
        postsHTML += `
            <article class="post">
                <section class="post__author">
                    <img src="${post.avatar}" alt="Avatar of ${post.name}" class="post__author--avatar">
                    <div class="post__author--info">
                        <p class="post__author--name">${post.name}</p>
                        <p class="post__author--location">${post.location}</p>
                    </div>
                </section>
                <img src="${post.post}" alt="Illustration of ${post.name}" class="post__img" data-post="${post.id}">
                <section class="post__content">
                    <div class="post__content--icons">
                        <img src="images/icon-heart.png" alt="" data-like="${post.id}">
                        <img src="images/icon-comment.png" alt="">
                        <img src="images/icon-dm.png" alt="">
                    </div>
                    <p class="post__content--likes">${post.likes} likes</p>
                    <p class="post__content--caption"><span class="post__content--username">${post.username}</span> ${post.comment}</p>
                </section>
            </article>
        `
    });

    return postsHTML;
};

const renderPosts = () => {
    document.querySelector(".post-container").innerHTML = getPostsHTML();
};
renderPosts();

document.addEventListener('dblclick', (event) => {
    if (event.target.dataset.post) {
        handleLikes(event.target.dataset.post);
    }
});

document.addEventListener('click', (event) => {
    if (event.target.dataset.like) {
        handleLikes(event.target.dataset.like);
    }
});

const handleLikes = (postId) => {
    const targetPostObj = posts.filter((post) => post.id === postId)[0];

    if (targetPostObj.isLiked) {
        targetPostObj.likes--;
    } else {
        targetPostObj.likes++;
    }
    targetPostObj.isLiked = !targetPostObj.isLiked;
    renderPosts();
};