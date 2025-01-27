import ListModel from '../Model/list-model';
import ListView from '../View/list-view';
import LatestMoviesModel from '../Model/latest-movies-model';

class ListController {
  constructor() {
    this.model = new ListModel();
    this.latestMoviesModel = new LatestMoviesModel();
    this.view = new ListView(
      this.handleSearch.bind(this),
      this.handleAddToList.bind(this),
      this.handleMarkAsWatched.bind(this),
      this.handleDeleteFilm.bind(this),
      this.handleSearchMovies.bind(this),
      this.handleCreateWatchlist.bind(this),
      this.handleSelectWatchlist.bind(this),
      this.handleAddReview.bind(this),
      this.handleExportWatchlist.bind(this),
      this.handleImportWatchlist.bind(this),
      this.handleDeleteWatchlist.bind(this) // Ajout de cette ligne
    );

    this.init();
  }

  init() {
    this.view.renderPage(this.model.getWatchlists(), this.model.getCurrentWatchlist());
    this.view.displayFilms(this.model.getFilms());
  }

  handleSearch(query) {
    const films = this.model.searchFilms(query);
    this.view.displayFilms(films);
  }

  handleAddToList(film) {
    const newFilm = {
      id: film.id || Date.now(),
      title: film.title,
      description: film.description || film.overview,
      releaseDate: film.releaseDate,
      genre: film.genre,
      watched: false
    };
    this.model.addToList(newFilm);
    this.view.displayFilms(this.model.getFilms());
  }

  handleMarkAsWatched(id) {
    this.model.markAsWatched(id);
    this.view.displayFilms(this.model.getFilms());
  }

  handleDeleteFilm(id) {
    this.model.deleteFilm(id);
    this.view.displayFilms(this.model.getFilms());
  }

  async handleSearchMovies(query) {
    if (query.length < 3) {
      this.view.displaySearchResults([]);
      return;
    }

    try {
      const movies = await this.latestMoviesModel.fetchLatestMovies(1, query);
      this.view.displaySearchResults(movies);
    } catch (error) {
      this.view.displayError('Error fetching movies. Please try again later.');
    }
  }

  handleCreateWatchlist(name) {
    this.model.createWatchlist(name);
    this.view.renderPage(this.model.getWatchlists(), this.model.getCurrentWatchlist());
    this.view.displayFilms(this.model.getFilms());
  }

  handleSelectWatchlist(name) {
    this.model.setCurrentWatchlist(name);
    this.view.renderPage(this.model.getWatchlists(), this.model.getCurrentWatchlist());
    this.view.displayFilms(this.model.getFilms());
  }

  handleAddReview(id, review, rating) {
    this.model.addReview(id, review, rating);
    this.view.displayFilms(this.model.getFilms());
  }

  /**
   * Handle watchlist export request
   * Gets watchlist data from model and triggers download
   * @param {string} watchlistName - Name of watchlist to export
   */
  handleExportWatchlist(watchlistName) {
    const watchlistData = this.model.exportWatchlist(watchlistName);
    this.view.handleExportWatchlist(watchlistData);
  }

  /**
   * Handle watchlist import request
   * Validates and imports watchlist data
   * @param {Object} watchlistData - Watchlist data to import
   */
  handleImportWatchlist(watchlistData) {
    try {
      this.model.importWatchlist(watchlistData);
      this.view.renderPage(this.model.getWatchlists(), this.model.getCurrentWatchlist());
      this.view.displayFilms(this.model.getFilms());
    } catch (error) {
      process.stdout(`Error importing watchlist: ${error.message}`);
    }
  }

  /**
   * Handle watchlist deletion request
   * Deletes the specified watchlist and updates the view
   * @param {string} watchlistName - Name of watchlist to delete
   */
  handleDeleteWatchlist(watchlistName) {
    try {
      this.model.deleteWatchlist(watchlistName);
      this.view.renderPage(this.model.getWatchlists(), this.model.getCurrentWatchlist());
      this.view.displayFilms(this.model.getFilms());
    } catch (error) {
      process.stdout(`Error deleting watchlist: ${error.message}`);
    }
  }
}

export default ListController;
