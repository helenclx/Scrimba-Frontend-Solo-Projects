// OMDb API: https://www.omdbapi.com/
const API_KEY = '65605e18';

const searchForm = document.querySelector('.search');
const movieSearchInput = document.getElementById('movie-search');
const resultsContainer = document.querySelector('.results');
const watchlistContainer = document.querySelector('.watchlist');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchMovies(movieSearchInput.value);
});

const searchMovies = async (input) => {
    const paramStr = input.replace(/\s+/gi, '+');

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${paramStr}&type=movie&apikey=${API_KEY}`);
        const data = await response.json();
        console.log("Search Results:", data);

        resultsContainer.innerHTML = `<h2>Search results for "${input}":</h2>`

        data.Search.forEach(result => {
            displayMovieResult(result.imdbID);
        });
    } catch (error) {
        console.error(error);
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