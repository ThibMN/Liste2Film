// src/Model/list-model.js

class ListModel {
  constructor() {
    this.films = JSON.parse(localStorage.getItem('films')) || [];
  }

  getFilms() {
    return this.films;
  }

  searchFilms(query) {
    return this.films.filter((film) => film.title && (
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
    this.films.push(newFilm);
    this.saveFilms();
  }

  markAsWatched(id) {
    this.films = this.films.map((film) => (
      film.id === id ? { ...film, watched: !film.watched } : film
    ));
    this.saveFilms();
  }

  deleteFilm(id) {
    this.films = this.films.filter((film) => film.id !== id);
    this.saveFilms();
  }

  saveFilms() {
    localStorage.setItem('films', JSON.stringify(this.films));
  }
}

export default ListModel;
