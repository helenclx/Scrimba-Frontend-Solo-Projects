// OMDb API: https://www.omdbapi.com/
const API_KEY = '65605e18';

const searchForm = document.querySelector('.search');
const movieSearchInput = document.getElementById('movie-search');
const resultsContainer = document.querySelector('.results');
const watchlistContainer = document.querySelector('.watchlist');

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
            renderMovie(data, resultsContainer);
        });

        document.addEventListener('click', (e) => {
            if (e.target.dataset.watchlist) {
                const targetMovieObj = data.Search.filter(movie => movie.imdbID === e.target.dataset.watchlist)[0];
                console.log("Target movie object:", targetMovieObj);
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
            <button class="movie__watchlist-btn" data-watchlist="${imdbID}" aria-label="Add to watchlist">Watchlist</button>
            <p>${Plot}</p>
        </div>
    `;
};

if (watchlistContainer){
    const displayWatchlist = () => {
        watchlistContainer.innerHTML = `
            <p>Your watchlist is looking a little empty...</p>
            <a href="index.html">Let’s add some movies!</a>
        `;
    };
    displayWatchlist();
}