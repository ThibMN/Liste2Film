/**
 * Model handling the interaction with TMDB API
 * Manages movie data fetching and storage
 */
class LatestMoviesModel {
  /**
   * Initialize the model with API configuration
   * Sets up API endpoints and authentication
   * Initializes local movie storage
   */
  constructor() {
    this.apiUrl = 'https://api.themoviedb.org/3/search/movie';
    this.apiToken = process.env.TMDB_API_TOKEN;
    this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    this.movies = []; // Local storage for fetched movies
  }

  /**
   * Fetch movies from TMDB API
   * Can fetch either search results or latest movies
   *
   * @param {number} page - Page number for pagination
   * @param {string} query - Optional search query
   * @returns {Promise<Array>} Array of formatted movie objects
   * @throws {Error} If the API request fails
   */
  async fetchLatestMovies(page = 1, query = '') {
    // Determine which endpoint to use based on query presence
    const url = query
      ? `${this.apiUrl}?query=${encodeURIComponent(query)}&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;

    // Set up API request headers
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    // Handle API response errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Process and format the API response
    const data = await response.json();
    const newMovies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: `${this.imageBaseUrl}${movie.poster_path}`,
      releaseDate: movie.release_date,
      overview: movie.overview,
      genre: movie.genre_ids.join(', '), // Convert genre IDs to string
      rating: movie.vote_average
    }));

    // Update local storage and return new movies
    this.movies = [...this.movies, ...newMovies];
    return newMovies;
  }

  /**
   * Retrieve a specific movie from local storage by ID
   * Used when adding movies to watchlists
   *
   * @param {number} id - ID of the movie to retrieve
   * @returns {Object|undefined} Movie object if found, undefined otherwise
   */
  getMovieById(id) {
    return this.movies.find((movie) => movie.id === id);
  }
}

export default LatestMoviesModel;
