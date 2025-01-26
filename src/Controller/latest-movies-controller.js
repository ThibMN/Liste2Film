import LatestMoviesModel from '../Model/latest-movies-model';
import LatestMoviesView from '../View/latest-movies-view';
import ListModel from '../Model/list-model';

class LatestMoviesController {
  constructor() {
    const container = document.getElementById('app');
    this.model = new LatestMoviesModel();
    this.listModel = new ListModel();
    this.view = new LatestMoviesView(container, this.handleAddToWatchlist.bind(this), this.handleLoadMore.bind(this));
    this.page = 1;

    this.init();
  }

  async init() {
    try {
      const movies = await this.model.fetchLatestMovies(this.page);
      this.view.renderPage();
      this.view.displayMovies(movies);
    } catch (error) {
      this.view.displayError('Unable to fetch the latest movies. Please try again later.');
    }
  }

  async handleLoadMore() {
    try {
      this.page += 1;
      const movies = await this.model.fetchLatestMovies(this.page);
      this.view.displayMovies(movies);
    } catch (error) {
      this.view.displayError('Unable to fetch more movies. Please try again later.');
    }
  }

  handleAddToWatchlist(movieId) {
    const movie = this.model.getMovieById(movieId);
    if (movie) {
      const film = {
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        releaseDate: movie.releaseDate,
        genre: movie.genre,
        watched: false
      };
      this.listModel.addToList(film);
      alert(`${movie.title} has been added to your watchlist.`);
    } else {
      alert('Movie not found.');
    }
  }
}

export default LatestMoviesController;
