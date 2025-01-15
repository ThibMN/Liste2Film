class ListView {
  constructor(onSearch, onAddToList, onMarkAsWatched) {
    this.onSearch = onSearch;
    this.onAddToList = onAddToList;
    this.onMarkAsWatched = onMarkAsWatched;

    this.filmList = document.querySelector('#film-list');
    this.searchInput = document.querySelector('#search-bar');
    this.addForm = document.querySelector('#add-form');

    this.attachEventListeners();
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
            </div>
          </div>
        `
      )
      .join('');

    this.attachFilmEventListeners();
  }

  attachFilmEventListeners() {
    this.filmList.querySelectorAll('.watch-btn').forEach((btn) => btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.closest('.list-group-item').dataset.id, 10);
      this.onMarkAsWatched(id);
    }));
  }
}

export default ListView;
