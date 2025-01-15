/* eslint-disable max-len */
import ListModel from '../Model/list-model';
import ListView from '../View/list-view';

const apiToken = process.env.TMDB_API_TOKEN;
console.log(apiToken);

class ListController {
  constructor() {
    this.model = new ListModel();
    this.view = new ListView(this.handleSearch, this.handleAddToList, this.handleMarkAsWatched);

    this.renderFilms();
  }

  renderFilms() {
    const films = this.model.getFilms();
    this.view.displayFilms(films);
  }

  handleSearch = (query) => {
    const films = this.model.searchFilms(query);
    this.view.displayFilms(films);
  };

  handleAddToList = (film) => {
    this.model.addToList(film);
    this.renderFilms();
  };

  handleMarkAsWatched = (id) => {
    this.model.markAsWatched(id);
    this.renderFilms();
  };
}

export default ListController;
