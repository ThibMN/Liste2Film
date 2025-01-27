import LatestMoviesModel from '../Model/latest-movies-model';
import LatestMoviesView from '../View/latest-movies-view';
import ListModel from '../Model/list-model';

/**
 * Controller handling the latest movies page functionality
 * Manages interactions between LatestMoviesView and Models
 */
class LatestMoviesController {
  /**
   * Initialize the controller with necessary models and view
   * Sets up event handlers and data connections
   * Creates instances of required models and view components
   */
  constructor() {
    const container = document.getElementById('app');
    this.model = new LatestMoviesModel();
    this.listModel = new ListModel();
    this.view = new LatestMoviesView(
      container,
      this.handleAddToWatchlist.bind(this),
      this.handleLoadMore.bind(this),
      this.getWatchlists.bind(this)
    );
    this.page = 1; // Keep track of current page for pagination

    this.init();
  }

  /**
   * Initialize the view with the first page of movies
   * Fetches initial movie data and handles potential errors
   * Sets up the page layout and displays first movies
   */
  async init() {
    try {
      const movies = await this.model.fetchLatestMovies(this.page);
      this.view.renderPage();
      this.view.displayMovies(movies);
    } catch (error) {
      this.view.displayError('Unable to fetch the latest movies. Please try again later.');
    }
  }

  /**
   * Handle loading more movies when requested
   * Increments page counter and fetches next batch of movies
   * Updates the view with new movies while preserving existing ones
   */
  async handleLoadMore() {
    try {
      this.page += 1;
      const movies = await this.model.fetchLatestMovies(this.page);
      this.view.displayMovies(movies);
    } catch (error) {
      this.view.displayError('Unable to fetch more movies. Please try again later.');
    }
  }

  /**
   * Add a selected movie to a specific watchlist
   * Retrieves movie details and creates a film object
   * Updates the selected watchlist and displays confirmation
   *
   * @param {number} movieId - ID of the movie to add to watchlist
   * @param {string} watchlistName - Name of the target watchlist
   */
  handleAddToWatchlist(movieId, watchlistName) {
    // Retrieve the movie details from the model
    const movie = this.model.getMovieById(movieId);

    if (movie) {
      // Create a film object with required properties
      const film = {
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.releaseDate,
        genre: movie.genre,
        watched: false // Initialize as unwatched
      };

      // Update the selected watchlist and add the film
      this.listModel.setCurrentWatchlist(watchlistName);
      this.listModel.addToList(film);

      // Show success notification to user
      this.view.displayNotification(
        `${movie.title} has been added to your watchlist "${watchlistName}".`
      );
    } else {
      // Handle case where movie is not found
      this.view.displayError('Movie not found.');
    }
  }

  /**
   * Retrieve all available watchlists from the list model
   * Used for populating watchlist selection dropdown
   *
   * @returns {string[]} Array of watchlist names
   */
  getWatchlists() {
    return this.listModel.getWatchlists();
  }
}

export default LatestMoviesController;
