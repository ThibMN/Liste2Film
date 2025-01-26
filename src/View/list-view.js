class ListView {
  constructor(onSearch, onAddToList, onMarkAsWatched, onDeleteFilm, onSearchMovies) {
    this.onSearch = onSearch;
    this.onAddToList = onAddToList;
    this.onMarkAsWatched = onMarkAsWatched;
    this.onDeleteFilm = onDeleteFilm;
    this.onSearchMovies = onSearchMovies;
  }

  renderPage() {
    const container = document.getElementById('app');
    container.innerHTML = `
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
              <a class="navbar-brand" href="#">Film List</a>
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
            <h1 class="text-center mb-4">Film List</h1>
            <div class="mb-3">
              <input
                type="text"
                id="search-movies-bar"
                class="form-control"
                placeholder="Search movies to add to watchlist..."
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
                placeholder="Search films..."
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

    if (
      this.searchInput
      && this.addForm
      && this.filmList
      && this.searchMoviesInput
      && this.searchResults
    ) {
      this.attachEventListeners();
    } else {
      throw new Error('One or more elements not found in the DOM');
    }
  }

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
  }

  displayFilms(films) {
    this.filmList.innerHTML = films
      .map(
        (film) => `
          <div class="list-group-item d-flex justify-content-between align-items-start ${film.watched ? 'list-group-item-success' : ''}" data-id="${film.id}">
            <div class="ms-2 me-auto">
              <div class="fw-bold">${film.title}</div>
              <p>${film.description}</p>
              <small>Genre: ${film.genre} | Release Date: ${film.releaseDate}</small>
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

  attachFilmEventListeners() {
    this.filmList.querySelectorAll('.watch-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.list-group-item').dataset.id, 10);
      this.onMarkAsWatched(id);
    }));

    this.filmList.querySelectorAll('.delete-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.list-group-item').dataset.id, 10);
      this.onDeleteFilm(id);
    }));
  }

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
