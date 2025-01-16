class LatestMoviesView {
  constructor(container) {
    this.container = container;
  }

  renderPage() {
    this.container.innerHTML = `
        <div class="container mt-5">
          <h1 class="text-center mb-4">Latest Movies</h1>
          <div id="latest-movies" class="row g-4"></div>
        </div>
      `;
    this.moviesContainer = this.container.querySelector('#latest-movies');
  }

  displayMovies(movies) {
    this.moviesContainer.innerHTML = movies
      .map(
        (movie) => `
            <div class="col-md-3">
              <div class="card shadow-sm">
                <img src="${movie.posterPath}" alt="${movie.title}" class="card-img-top">
                <div class="card-body text-center">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text"><small class="text-muted">Release Date: ${movie.releaseDate}</small></p>
                </div>
              </div>
            </div>
          `
      )
      .join('');
  }

  displayError(message) {
    this.moviesContainer.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
          ${message}
        </div>
      `;
  }
}

export default LatestMoviesView;
