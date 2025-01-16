import LatestMoviesModel from '../Model/latest-movies-model';
import LatestMoviesView from '../View/latest-movies-view';

class LatestMoviesController {
  constructor(params) {
    this.params = params; // Peut être utilisé pour des filtres ou des ID
    const container = document.getElementById('app');
    this.model = new LatestMoviesModel();
    this.view = new LatestMoviesView(container);

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
