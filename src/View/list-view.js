class ListView {
  /**
   * Initialize the ListView with all necessary event handlers
   * @param {Function} onSearch - Handler for searching films in watchlist
   * @param {Function} onAddToList - Handler for adding a new film to watchlist
   * @param {Function} onMarkAsWatched - Handler for marking a film as watched
   * @param {Function} onDeleteFilm - Handler for deleting a film from watchlist
   * @param {Function} onSearchMovies - Handler for searching movies from TMDB API
   * @param {Function} onCreateWatchlist - Handler for creating a new watchlist
   * @param {Function} onSelectWatchlist - Handler for selecting a different watchlist
   * @param {Function} onAddReview - Handler for adding a review to a film
   */
  constructor(
    onSearch,
    onAddToList,
    onMarkAsWatched,
    onDeleteFilm,
    onSearchMovies,
    onCreateWatchlist,
    onSelectWatchlist,
    onAddReview
  ) {
    this.onSearch = onSearch;
    this.onAddToList = onAddToList;
    this.onMarkAsWatched = onMarkAsWatched;
    this.onDeleteFilm = onDeleteFilm;
    this.onSearchMovies = onSearchMovies;
    this.onCreateWatchlist = onCreateWatchlist;
    this.onSelectWatchlist = onSelectWatchlist;
    this.onAddReview = onAddReview;
  }

  /**
   * Render the main page with watchlist selector and all forms
   * @param {string[]} watchlists - Array of available watchlist names
   * @param {string} currentWatchlist - Currently selected watchlist name
   */
  renderPage(watchlists, currentWatchlist) {
    const container = document.getElementById('app');
    container.innerHTML = `
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
              <a class="navbar-brand" href="#">Liste2Films</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/latest-movies">Latest Movies</a>
                  </li>
                </ul>
              </div>
            </nav>
            <h1 class="text-center mb-4">Liste2Films</h1>
            <div class="mb-3">
              <select id="watchlist-select" class="form-select">
                ${watchlists.map((watchlist) => `<option value="${watchlist}" ${watchlist === currentWatchlist ? 'selected' : ''}>${watchlist}</option>`).join('')}
              </select>
            </div>
            <div class="mb-3">
              <input
                type="text"
                id="new-watchlist-name"
                class="form-control"
                placeholder="New watchlist name"
              />
              <button id="create-watchlist-btn" class="btn btn-primary mt-2">Create Watchlist</button>
            </div>
            <div class="mb-3">
              <input
                type="text"
                id="search-movies-bar"
                class="form-control"
                placeholder="Search filmes to add to watchlist"
              />
            </div>
            <form id="add-form" class="mb-4">
              <div class="mb-3">
                <input
                  type="text"
                  name="title"
                  class="form-control"
                  placeholder="Film Title"
                  required
                />
              </div>
              <div class="mb-3">
                <textarea
                  name="description"
                  class="form-control"
                  placeholder="Film Description"
                ></textarea>
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  name="releaseDate"
                  class="form-control"
                  placeholder="Release Date (YYYY-MM-DD)"
                />
              </div>
              <div class="mb-3">
                <input
                  type="text"
                  name="genre"
                  class="form-control"
                  placeholder="Genre"
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Add Film</button>
            </form>
            <div class="mb-3">
              <input
                type="text"
                id="search-bar"
                class="form-control"
                placeholder="Search films in watchlist"
              />
            </div>
            <div id="film-list" class="list-group"></div>
            <div id="search-results" class="list-group mt-4"></div>
          </div>
        </div>
      </div>
    `;

    this.filmList = document.querySelector('#film-list');
    this.searchInput = document.querySelector('#search-bar');
    this.addForm = document.querySelector('#add-form');
    this.searchMoviesInput = document.querySelector('#search-movies-bar');
    this.searchResults = document.querySelector('#search-results');
    this.watchlistSelect = document.querySelector('#watchlist-select');
    this.newWatchlistName = document.querySelector('#new-watchlist-name');
    this.createWatchlistBtn = document.querySelector('#create-watchlist-btn');

    if (
      this.searchInput
      && this.addForm
      && this.filmList
      && this.searchMoviesInput
      && this.searchResults
      && this.watchlistSelect
      && this.newWatchlistName
      && this.createWatchlistBtn
    ) {
      this.attachEventListeners();
    } else {
      throw new Error('One or more elements not found in the DOM');
    }
  }

  /**
   * Attach all event listeners to the page elements
   * Including search, form submission, movie search, and watchlist management
   */
  attachEventListeners() {
    this.searchInput.addEventListener('input', (e) => {
      this.onSearch(e.target.value);
    });

    this.addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = e.target.title.value.trim();
      const description = e.target.description.value.trim();
      const releaseDate = e.target.releaseDate.value.trim();
      const genre = e.target.genre.value.trim();

      if (title && description) {
        this.onAddToList({
          title, description, releaseDate, genre
        });
        e.target.reset();
      }
    });

    this.searchMoviesInput.addEventListener('input', (e) => {
      this.onSearchMovies(e.target.value);
    });

    this.createWatchlistBtn.addEventListener('click', () => {
      const name = this.newWatchlistName.value.trim();
      if (name) {
        this.onCreateWatchlist(name);
        this.newWatchlistName.value = '';
      }
    });

    this.watchlistSelect.addEventListener('change', (e) => {
      this.onSelectWatchlist(e.target.value);
    });
  }

  /**
   * Display the list of films in the current watchlist
   * @param {Array} films - Array of film objects to display
   */
  displayFilms(films) {
    this.filmList.innerHTML = films
      .map(
        (film) => `
          <div class="list-group-item d-flex justify-content-between align-items-start ${film.watched ? 'list-group-item-success' : ''}" data-id="${film.id}">
            <div class="ms-2 me-auto">
              <div class="fw-bold">${film.title}</div>
              <p>${film.description}</p>
              <small>Genre: ${film.genre} | Release Date: ${film.releaseDate}</small>
              <p><strong>Review:</strong> ${film.review || 'No review yet'}</p>
              <p><strong>Rating:</strong> ${film.rating || 'Not rated yet'}/10</p>
              <textarea class="form-control mb-2 review-input" placeholder="Add a review...">${film.review || ''}</textarea>
              <input type="number" class="form-control mb-2 rating-input" placeholder="Rating out of 10" value="${film.rating || ''}" min="0" max="10">
              <button class="btn btn-sm btn-primary save-review-btn">Save Review</button>
            </div>
            <div>
              <button class="btn btn-sm btn-success watch-btn me-2">${film.watched ? 'Unmark' : 'Watched'}</button>
              <button class="btn btn-sm btn-danger delete-btn">Delete</button>
            </div>
          </div>
        `
      )
      .join('');

    this.attachFilmEventListeners();
  }

  /**
   * Display search results from TMDB API
   * @param {Array} movies - Array of movie objects from TMDB API
   */
  displaySearchResults(movies) {
    this.searchResults.innerHTML = movies
      .map(
        (movie) => `
          <div class="list-group-item d-flex justify-content-between align-items-start" data-id="${movie.id}">
            <div class="ms-2 me-auto">
              <div class="fw-bold">${movie.title}</div>
              <p>${movie.overview}</p>
              <small>Genre: ${movie.genre} | Release Date: ${movie.releaseDate}</small>
            </div>
            <div>
              <button class="btn btn-sm btn-primary add-to-watchlist-btn">Add to Watchlist</button>
            </div>
          </div>
        `
      )
      .join('');

    this.attachAddToWatchlistEventListeners();
  }

  /**
   * Attach event listeners to the Liste2Films items
   * Including watched toggle, delete, and review functionality
   */
  attachFilmEventListeners() {
    this.filmList.querySelectorAll('.watch-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.list-group-item').dataset.id, 10);
      this.onMarkAsWatched(id);
    }));

    this.filmList.querySelectorAll('.delete-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.list-group-item').dataset.id, 10);
      this.onDeleteFilm(id);
    }));

    this.filmList.querySelectorAll('.save-review-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.list-group-item').dataset.id, 10);
      const review = e.target.closest('.list-group-item').querySelector('.review-input').value.trim();
      const rating = parseInt(e.target.closest('.list-group-item').querySelector('.rating-input').value, 10);
      this.onAddReview(id, review, rating);
    }));
  }

  /**
   * Attach event listeners to the add to watchlist buttons in search results
   * Allows adding movies from search results to the current watchlist
   */
  attachAddToWatchlistEventListeners() {
    this.searchResults.querySelectorAll('.add-to-watchlist-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.list-group-item').dataset.id, 10);
      const movie = this.searchResults.querySelector(`.list-group-item[data-id="${id}"]`);
      const title = movie.querySelector('.fw-bold').textContent;
      const description = movie.querySelector('p').textContent;
      const releaseDate = movie.querySelector('small').textContent.split('|')[1].trim();
      const genre = movie.querySelector('small').textContent.split('|')[0].trim();
      this.onAddToList({
        id, title, description, releaseDate, genre
      });
    }));
  }
}

export default ListView;
