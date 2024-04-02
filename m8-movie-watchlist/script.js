// OMDb API: https://www.omdbapi.com/
const API_KEY = '65605e18';

const searchForm = document.querySelector('.search');
const movieSearchInput = document.getElementById('movie-search');
const resultsContainer = document.querySelector('.results');
const watchlistContainer = document.querySelector('.watchlist');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchMovies(movieSearchInput.value);
    movieSearchInput.value = '';
});

const searchMovies = async (input) => {
    try {
        const paramStr = input.replace(/\s+/gi, '+');
        const response = await fetch(`https://www.omdbapi.com/?s=${paramStr}&type=movie&apikey=${API_KEY}`);
        const data = await response.json();
        console.log("Search Results:", data);

        const resultHeading = document.createElement('h2');
        resultHeading.textContent = `Search results for "${input}":`;
        resultsContainer.append(resultHeading);

        data.Search.forEach(result => {
            displayMovieResult(result.imdbID);
        });

        document.addEventListener('click', (e) => {
            if (e.target.dataset.watchlist) {
                let targetMovieObj = {};
                data.Search.forEach(movie => {
                    if (movie.imdbID === e.target.dataset.watchlist) {
                        targetMovieObj = movie;
                        console.log("Target movie object:", targetMovieObj);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);

        const resultHeading = document.createElement('h2');
        resultHeading.textContent = `No results for "${input}" found.`;
        resultsContainer.append(resultHeading);
    }
};

const displayMovieResult = async (imdbID) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
        const data = await response.json();

        const {Poster, Title, imdbRating, Runtime, Genre, Plot} = data;

        resultsContainer.innerHTML += `
            <div class="result">
                <img src="${Poster}" alt="Poster of ${Title}">
                <h3>${Title}</h3>
                <p>${imdbRating}</p>
                <p>${Runtime}</p>
                <p>${Genre}</p>
                <button class="result__watchlist-btn" data-watchlist="${imdbID}" aria-label="Add to watchlist">Watchlist</button>
                <p>${Plot}</p>
            </div>
        `;
    } catch (error) {
        console.error(error);
    }
};