// src/Model/list-model.js

class ListModel {
  constructor() {
    this.watchlists = JSON.parse(localStorage.getItem('watchlists')) || {};
    this.currentWatchlist = localStorage.getItem('currentWatchlist') || 'Default';
    if (!this.watchlists[this.currentWatchlist]) {
      this.watchlists[this.currentWatchlist] = [];
    }
  }

  getWatchlists() {
    return Object.keys(this.watchlists);
  }

  getCurrentWatchlist() {
    return this.currentWatchlist;
  }

  setCurrentWatchlist(name) {
    this.currentWatchlist = name;
    localStorage.setItem('currentWatchlist', name);
  }

  createWatchlist(name) {
    if (!this.watchlists[name]) {
      this.watchlists[name] = [];
      this.saveWatchlists();
    }
  }

  getFilms() {
    return this.watchlists[this.currentWatchlist] || [];
  }

  searchFilms(query) {
    return this.getFilms().filter((film) => film.title && (
      film.title.toLowerCase().includes(query.toLowerCase())
      || film.genre.toLowerCase().includes(query.toLowerCase())
      || film.releaseDate.includes(query)
    ));
  }

  addToList(film) {
    if (!film.title || !film.description || !film.releaseDate || !film.genre) {
      throw new Error('Film object is missing required properties');
    }

    const newFilm = {
      id: Date.now(),
      ...film,
      watched: false
    };
    this.watchlists[this.currentWatchlist].push(newFilm);
    this.saveWatchlists();
  }

  markAsWatched(id) {
    this.watchlists[this.currentWatchlist] = this.watchlists[this.currentWatchlist].map((film) => (
      film.id === id ? { ...film, watched: !film.watched } : film
    ));
    this.saveWatchlists();
  }

  deleteFilm(id) {
    this.watchlists[this.currentWatchlist] = this.watchlists[this.currentWatchlist]
      .filter((film) => film.id !== id);
    this.saveWatchlists();
  }

  saveWatchlists() {
    localStorage.setItem('watchlists', JSON.stringify(this.watchlists));
  }
}

export default ListModel;
