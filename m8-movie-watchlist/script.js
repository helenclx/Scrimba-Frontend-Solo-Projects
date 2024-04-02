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
console.log("Watchlist:", watchlist);

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        searchMovies(movieSearchInput.value);
        movieSearchInput.value = '';
    });
}

const searchMovies = async (input) => {
    try {
        const paramStr = input.replace(/\s+/gi, '+');
        const response = await fetch(`https://www.omdbapi.com/?s=${paramStr}&type=movie&apikey=${API_KEY}`);
        const data = await response.json();
        console.log("Search Results:", data);

        const resultHeading = document.createElement('h2');
        resultHeading.textContent = `Search results for "${input}":`;
        resultsContainer.append(resultHeading);

        data.Search.forEach(async (result) => {
            const response = await fetch(`https://www.omdbapi.com/?i=${result.imdbID}&apikey=${API_KEY}`);
            const data = await response.json();
            resultsArr.push(data);
            renderMovie(data, resultsContainer);
        });

        console.log("Results Array:", resultsArr);
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
            ${renderWatchlistBtn(obj)}
            <p>${Plot}</p>
        </div>
    `;
};

const renderWatchlistBtn = (movieObj) => {
    let watchlistBtnText = 'Watchlist';
    let watchlistBtnAriaLabel = 'Add to Watchlist';

    for (const movie of watchlist) {
        if (movie.imdbID === movieObj.imdbID) {
            watchlistBtnText = 'Remove';
            watchlistBtnAriaLabel = 'Remove from watchlist';
        }
    };

    const btnHTML = `<button class="movie__watchlist-btn" data-watchlist="${movieObj.imdbID}" aria-label="${watchlistBtnAriaLabel}">${watchlistBtnText}</button>`

    return btnHTML;
};

document.addEventListener('click', (e) => {
    if (e.target.dataset.watchlist) {
        if (resultsContainer) {
            updateWatchList(resultsArr, e.target.dataset.watchlist);
        } else if (watchlistContainer) {
            updateWatchList(watchlist, e.target.dataset.watchlist);
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

    console.log("Target movie object:", targetMovieObj);

    if (!watchlist.includes(targetMovieObj)) {
        watchlist.push(targetMovieObj);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        console.log("Updated Watchlist:", watchlist);
    } else {
        const targetMovieObjIndex = watchlist.indexOf(targetMovieObj);
        console.log("Target Movie Object Index:", targetMovieObjIndex);
        watchlist.splice(targetMovieObjIndex, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
};

const displayWatchlist = () => {
    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '';
        watchlistContainer.innerHTML = `
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html">Let’s add some movies!</a>
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
