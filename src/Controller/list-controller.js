import LatestMoviesModel from '../Model/latest-movies-model';
import LatestMoviesView from '../View/latest-movies-view';

class LatestMoviesController {
  constructor(container) {
    this.container = container;
    this.model = new LatestMoviesModel();
    this.view = new LatestMoviesView(this.container);

    this.init();
  }

  async init() {
    try {
      const movies = await this.model.fetchLatestMovies();
      this.view.renderPage();
      this.view.displayMovies(movies);
    } catch (error) {
      console.error('Failed to load latest movies:', error);
      this.view.displayError('Unable to fetch the latest movies. Please try again later.');
    }
  }
}

export default LatestMoviesController;
