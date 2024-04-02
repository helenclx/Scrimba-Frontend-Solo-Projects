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
    input = input.replace(/\s+/gi, '+');

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${input}&type=movie&apikey=${API_KEY}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};