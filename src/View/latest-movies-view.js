/**
 * View handling the display of latest movies from TMDB API
 * Manages the UI for browsing and adding movies to watchlists
 */
class LatestMoviesView {
  /**
   * Initialize the view with necessary handlers
   * @param {HTMLElement} container - Main container element
   * @param {Function} onAddToWatchlist - Handler for adding movies to watchlist
   * @param {Function} onLoadMore - Handler for loading more movies
   * @param {Function} getWatchlists - Function to get available watchlists
   */
  constructor(container, onAddToWatchlist, onLoadMore, getWatchlists) {
    this.container = container;
    this.onAddToWatchlist = onAddToWatchlist;
    this.onLoadMore = onLoadMore;
    this.getWatchlists = getWatchlists;
  }

  /**
   * Render the main page layout with styling
   * Sets up the container with necessary HTML and CSS
   * Creates the movie grid and load more button
   */
  renderPage() {
    this.container.innerHTML = `
        <style>
          body {
            background-color: #1e272e;
            color: white;
          }
          .card {
            background-color: #485460;
            border: none;
            color: white;
          }
          .btn-primary {
            background-color: #3c40c6;
            border-color: #3c40c6;
          }
          .btn-primary:hover {
            background-color: #575fcf;
            border-color: #575fcf;
          }
          .btn-secondary {
            background-color: #485460;
            border-color: #485460;
          }
          .btn-secondary:hover {
            background-color: #1e272e;
            border-color: #1e272e;
          }
          .modal-content {
            background-color: #485460;
            color: white;
          }
          .form-control {
            background-color: #1e272e;
            border-color: #575fcf;
            color: white;
          }
          .form-control:focus {
            background-color: #1e272e;
            border-color: #3c40c6;
            color: white;
            box-shadow: 0 0 0 0.2rem rgba(60, 64, 198, 0.25);
          }
          .modal-header {
            border-bottom: 1px solid #575fcf;
          }
          .modal-footer {
            border-top: 1px solid #575fcf;
          }
          .text-muted {
            color: #adb5bd !important;
          }
          .card-title {
            color: white !important;
          }
          .card-text {
            color: white !important;
          }
        </style>
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

  /**
   * Display a list of movies in the grid layout
   * Appends new movies to the existing display
   * @param {Array} movies - Array of movie objects to display
   */
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

  /**
   * Attach event listeners to all "Add to Watchlist" buttons
   * Triggers the watchlist selection modal when clicked
   */
  attachAddToWatchlistEventListeners() {
    this.moviesContainer.querySelectorAll('.add-to-watchlist-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id, 10);
      this.showWatchlistSelection(id);
    }));
  }

  /**
   * Display a modal for selecting which watchlist to add the movie to
   * Creates a temporary modal element with watchlist options
   * @param {number} movieId - ID of the movie to be added to a watchlist
   */
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

  /**
   * Attach event listener to the "Load More" button
   * Triggers the loading of the next page of movies when clicked
   */
  attachLoadMoreEventListener() {
    this.loadMoreBtn.addEventListener('click', () => {
      this.onLoadMore();
    });
  }

  /**
   * Display an error message to the user
   * Replaces the movie grid with an error alert
   * @param {string} message - Error message to display
   */
  displayError(message) {
    this.moviesContainer.innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
          ${message}
        </div>
      `;
  }

  /**
   * Display a success notification to the user
   * Shows a temporary message when a movie is added to a watchlist
   * @param {string} message - Success message to display
   */
  displayNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
}

export default LatestMoviesView;
