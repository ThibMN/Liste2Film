/**
 * Model handling watchlist management and film data
 * Manages local storage of watchlists and film operations
 */
class ListModel {
  /**
   * Initialize the model with stored watchlists
   * Creates default watchlist if none exists
   * Sets up local storage synchronization
   */
  constructor() {
    this.watchlists = JSON.parse(localStorage.getItem('watchlists')) || {};
    this.currentWatchlist = localStorage.getItem('currentWatchlist') || 'Default';
    if (!this.watchlists[this.currentWatchlist]) {
      this.watchlists[this.currentWatchlist] = [];
    }
  }

  /**
   * Get all available watchlist names
   * @returns {string[]} Array of watchlist names
   */
  getWatchlists() {
    return Object.keys(this.watchlists);
  }

  /**
   * Get the currently selected watchlist name
   * @returns {string} Name of current watchlist
   */
  getCurrentWatchlist() {
    return this.currentWatchlist;
  }

  /**
   * Change the current active watchlist
   * @param {string} name - Name of watchlist to select
   */
  setCurrentWatchlist(name) {
    this.currentWatchlist = name;
    localStorage.setItem('currentWatchlist', name);
  }

  /**
   * Create a new empty watchlist
   * @param {string} name - Name for the new watchlist
   */
  createWatchlist(name) {
    if (!this.watchlists[name]) {
      this.watchlists[name] = [];
      this.saveWatchlists();
    }
  }

  /**
   * Delete a watchlist
   * @param {string} name - Name of watchlist to delete
   * @throws {Error} If trying to delete the default watchlist
   */
  deleteWatchlist(name) {
    if (name === 'Default') {
      throw new Error('Cannot delete default watchlist');
    }
    delete this.watchlists[name];
    if (this.currentWatchlist === name) {
      this.currentWatchlist = 'Default';
      localStorage.setItem('currentWatchlist', 'Default');
    }
    this.saveWatchlists();
  }

  /**
   * Get all films from current watchlist
   * @returns {Array} Array of film objects
   */
  getFilms() {
    return this.watchlists[this.currentWatchlist] || [];
  }

  /**
   * Search films in current watchlist
   * Filters by title, genre, or release date
   * @param {string} query - Search query string
   * @returns {Array} Filtered array of matching films
   */
  searchFilms(query) {
    return this.getFilms().filter((film) => film.title && (
      film.title.toLowerCase().includes(query.toLowerCase())
      || film.genre.toLowerCase().includes(query.toLowerCase())
      || film.releaseDate.includes(query)
    ));
  }

  /**
   * Add a new film to current watchlist
   * Validates required properties and initializes additional fields
   * @param {Object} film - Film object to add
   * @throws {Error} If required properties are missing
   */
  addToList(film) {
    // Validate required properties
    if (!film.title || !film.description || !film.releaseDate || !film.genre) {
      throw new Error('Film object is missing required properties');
    }

    // Create new film object with additional fields
    const newFilm = {
      id: Date.now(),
      ...film,
      watched: false,
      review: '',
      rating: 0
    };

    // Add to current watchlist and save
    this.watchlists[this.currentWatchlist].push(newFilm);
    this.saveWatchlists();
  }

  /**
   * Toggle watched status of a film
   * @param {number} id - ID of film to update
   */
  markAsWatched(id) {
    this.watchlists[this.currentWatchlist] = this.watchlists[this.currentWatchlist].map((film) => (
      film.id === id ? { ...film, watched: !film.watched } : film
    ));
    this.saveWatchlists();
  }

  /**
   * Remove a film from current watchlist
   * @param {number} id - ID of film to delete
   */
  deleteFilm(id) {
    this.watchlists[this.currentWatchlist] = this.watchlists[this.currentWatchlist]
      .filter((film) => film.id !== id);
    this.saveWatchlists();
  }

  /**
   * Add or update review and rating for a film
   * @param {number} id - ID of film to review
   * @param {string} review - Text review content
   * @param {number} rating - Numerical rating (0-10)
   */
  addReview(id, review, rating) {
    this.watchlists[this.currentWatchlist] = this.watchlists[this.currentWatchlist].map((film) => (
      film.id === id ? { ...film, review, rating } : film
    ));
    this.saveWatchlists();
  }

  /**
   * Export a specific watchlist
   * @param {string} watchlistName - Name of watchlist to export
   * @returns {Object} Watchlist data including films
   */
  exportWatchlist(watchlistName) {
    return {
      name: watchlistName,
      films: this.watchlists[watchlistName] || []
    };
  }

  /**
   * Import a watchlist from data
   * @param {Object} watchlistData - Watchlist data to import
   * @throws {Error} If data format is invalid
   */
  importWatchlist(watchlistData) {
    if (!watchlistData.name || !Array.isArray(watchlistData.films)) {
      throw new Error('Invalid watchlist data format');
    }

    // Add suffix if watchlist name already exists
    let { name } = watchlistData;
    let counter = 1;
    while (this.watchlists[name]) {
      name = `${watchlistData.name} (${counter})`;
      counter += 1;
    }

    this.watchlists[name] = watchlistData.films;
    this.saveWatchlists();
  }

  /**
   * Save current state to localStorage
   * Persists all watchlists and their films
   */
  saveWatchlists() {
    localStorage.setItem('watchlists', JSON.stringify(this.watchlists));
  }
}

export default ListModel;
