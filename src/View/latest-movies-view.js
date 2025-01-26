class LatestMoviesView {
  constructor(container, onAddToWatchlist, onLoadMore, getWatchlists) {
    this.container = container;
    this.onAddToWatchlist = onAddToWatchlist;
    this.onLoadMore = onLoadMore;
    this.getWatchlists = getWatchlists;
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
      this.showWatchlistSelection(id);
    }));
  }

  showWatchlistSelection(movieId) {
    const watchlists = this.getWatchlists();
    const watchlistOptions = watchlists.map((watchlist) => `<option value="${watchlist}">${watchlist}</option>`).join('');
    const modalHtml = `
      <div class="modal" tabindex="-1" role="dialog" id="watchlistModal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Select Watchlist</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <select id="watchlist-select" class="form-control">
                ${watchlistOptions}
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="confirm-add-btn">Add</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('watchlistModal');
    const confirmAddBtn = modal.querySelector('#confirm-add-btn');
    confirmAddBtn.addEventListener('click', () => {
      const selectedWatchlist = modal.querySelector('#watchlist-select').value;
      this.onAddToWatchlist(movieId, selectedWatchlist);
      modal.remove();
    });
    modal.style.display = 'block';
    modal.querySelector('.close').addEventListener('click', () => modal.remove());
    modal.querySelector('.btn-secondary').addEventListener('click', () => modal.remove());
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
