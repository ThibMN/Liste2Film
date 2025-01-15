// src/Model/list-model.js

class ListModel {
  constructor() {
    this.films = JSON.parse(localStorage.getItem('films')) || [];
  }

  getFilms() {
    return this.films;
  }

  searchFilms(query) {
    return this.films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase()));
  }

  addToList(film) {
    const newFilm = {
      id: Date.now(),
      ...film,
      watched: false
    };
    this.films.push(newFilm);
    this.saveFilms();
  }

  markAsWatched(id) {
    this.films = this.films.map((film) => (film.id === id ? { ...film, watched: !film.watched } : film));
    this.saveFilms();
  }

  saveFilms() {
    localStorage.setItem('films', JSON.stringify(this.films));
  }
}

export default ListModel;
