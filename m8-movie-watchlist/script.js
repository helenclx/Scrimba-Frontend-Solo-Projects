// OMDb API: https://www.omdbapi.com/
const API_KEY = '65605e18';

const searchForm = document.querySelector('.search');
const movieSearchInput = document.getElementById('movie-search');
const resultsContainer = document.querySelector('.results');
const watchlistContainer = document.querySelector('.watchlist');

let resultsArr = [];
let watchlist = [];

if (localStorage.getItem("watchlist")) {
    watchlist = JSON.parse(localStorage.getItem("watchlist"));
}

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchMovies(movieSearchInput.value);
        movieSearchInput.value = '';
    });
}

const searchMovies = async (input) => {
    resultsContainer.innerHTML = '';

    try {
        const paramStr = input.replace(/\s+/gi, '+');
        const response = await fetch(`https://www.omdbapi.com/?s=${paramStr}&type=movie&apikey=${API_KEY}`);
        const data = await response.json();

        const resultHeading = document.createElement('h2');
        resultHeading.textContent = `Search results for "${input}":`;
        resultsContainer.append(resultHeading);

        data.Search.forEach(async (result) => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${result.imdbID}&plot=full&apikey=${API_KEY}`);
                const data = await response.json();
                resultsArr.push(data);
                renderMovie(data, resultsContainer);
            } catch (error) {
                console.error(error);
            }
        });
    } catch (error) {
        console.error(error);

        const resultHeading = document.createElement('h2');
        resultHeading.textContent = `No results for "${input}" found.`;
        resultsContainer.append(resultHeading);
    }
};

const renderMovie = (obj, container) => {
    const {imdbID, Poster, Title, imdbRating, Runtime, Genre, Plot} = obj;

    container.innerHTML += `
        <div class="movie">
            <img src="${Poster}" alt="Poster of ${Title}">
            <h3>${Title}</h3>
            <p>${imdbRating}</p>
            <p>${Runtime}</p>
            <p>${Genre}</p>
            <button class="movie__watchlist-btn" data-watchlist="${imdbID}" aria-label="${renderWatchlistBtn(imdbID).ariaLabel}">${renderWatchlistBtn(imdbID).btnInner}</button>
            <p>${Plot}</p>
        </div>
    `;
};

const renderWatchlistBtn = (imdbID) => {
    let watchlistbtnInner = `<i class="fa-solid fa-circle-plus"></i> Watchlist`;
    let watchlistBtnAriaLabel = 'Add to Watchlist';

    for (const movie of watchlist) {
        if (Object.values(movie).includes(imdbID)) {
            watchlistbtnInner = `<i class="fa-solid fa-circle-minus"></i> Remove`;
            watchlistBtnAriaLabel = 'Remove from Watchlist';
        }
    };

    return {btnInner: watchlistbtnInner, ariaLabel: watchlistBtnAriaLabel};
};

document.addEventListener('click', (e) => {
    const eventTargetIMDbId = e.target.dataset.watchlist;

    if (eventTargetIMDbId) {
        if (resultsContainer) {
            updateWatchList(resultsArr, eventTargetIMDbId);
            e.target.innerHTML = renderWatchlistBtn(eventTargetIMDbId).btnInner;
            e.target.ariaLabel = renderWatchlistBtn(eventTargetIMDbId).ariaLabel;
        } else if (watchlistContainer) {
            updateWatchList(watchlist, eventTargetIMDbId);
            e.target.parentElement.remove();
            displayWatchlist();
        }
    }
});

const updateWatchList = (arr, targetId) => {
    let targetMovieObj = {};

    for (const movie of arr) {
        if (Object.values(movie).includes(targetId)) {
            targetMovieObj = movie;
        }
    }

    if (!watchlist.includes(targetMovieObj)) {
        watchlist.push(targetMovieObj);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } else {
        const targetMovieObjIndex = watchlist.indexOf(targetMovieObj);
        watchlist.splice(targetMovieObjIndex, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
};

const displayWatchlist = () => {
    watchlistContainer.innerHTML = '';

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = `
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html">Let's add some movies!</a>
        `;
    } else {
        watchlist.forEach(movie => {
            renderMovie(movie, watchlistContainer);
        })
    }
};

if (watchlistContainer) {
    displayWatchlist();
}
