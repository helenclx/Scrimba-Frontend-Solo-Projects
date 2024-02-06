const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "images/avatar-vangogh.jpg",
        post: "images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "images/avatar-courbet.jpg",
        post: "images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
        {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "images/avatar-ducreux.jpg",
        post: "images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
]

const postContainerEl = document.querySelector(".post-container");

posts.forEach((post) => {
    postContainerEl.innerHTML += `
        <article class="post">
            <section class="post__author">
                <img src="${post.avatar}" alt="Avatar of ${post.name}" class="post__author--avatar">
                <div class="post__author--info">
                    <p class="post__author--name">${post.name}</p>
                    <p class="post__author--location">${post.location}</p>
                </div>
            </section>
            <img src="${post.post}" alt="Illustration of ${post.name}" class="post__img">
            <section class="post__content">
                <div class="post__content--icons">
                    <img src="images/icon-heart.png" alt="">
                    <img src="images/icon-comment.png" alt="">
                    <img src="images/icon-dm.png" alt="">
                </div>
                <p class="post__content-likes">${post.likes} likes</p>
                <p class="post__content--caption"><span class="post__content--username">${post.username}</span> ${post.comment}</p>
            </section>
        </article>
    `
});