class LatestMoviesView {
  constructor(container, onAddToWatchlist, onLoadMore) {
    this.container = container;
    this.onAddToWatchlist = onAddToWatchlist;
    this.onLoadMore = onLoadMore;
  }

  renderPage() {
    this.container.innerHTML = `
        <div class="container mt-5">
          <div class="d-flex justify-content-between mb-4">
            <h1 class="text-center">Latest Movies</h1>
            <a href="/" class="btn btn-secondary">Back to Watchlist</a>
          </div>
          <div id="latest-movies" class="row g-4"></div>
          <div class="text-center mt-4">
            <button id="load-more-btn" class="btn btn-primary">Load More</button>
          </div>
        </div>
      `;
    this.moviesContainer = this.container.querySelector('#latest-movies');
    this.loadMoreBtn = this.container.querySelector('#load-more-btn');
    this.attachLoadMoreEventListener();
  }

  displayMovies(movies) {
    this.moviesContainer.innerHTML += movies
      .map(
        (movie) => `
            <div class="col-md-3">
              <div class="card shadow-sm">
                <img src="${movie.posterPath}" alt="${movie.title}" class="card-img-top">
                <div class="card-body text-center">
                  <h5 class="card-title">${movie.title}</h5>
                  <p class="card-text">${movie.overview}</p>
                  <p class="card-text"><small class="text-muted">Genre: ${movie.genre}</small></p>
                  <p class="card-text"><small class="text-muted">Release Date: ${movie.releaseDate}</small></p>
                  <p class="card-text"><small class="text-muted">Rating: ${movie.rating}</small></p>
                  <button class="btn btn-primary add-to-watchlist-btn" data-id="${movie.id}">Add to Watchlist</button>
                </div>
              </div>
            </div>
          `
      )
      .join('');

    this.attachAddToWatchlistEventListeners();
  }

  attachAddToWatchlistEventListeners() {
    this.moviesContainer.querySelectorAll('.add-to-watchlist-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id, 10);
      this.onAddToWatchlist(id);
    }));
  }

  attachLoadMoreEventListener() {
    this.loadMoreBtn.addEventListener('click', () => {
      this.onLoadMore();
    });
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
