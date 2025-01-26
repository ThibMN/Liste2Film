class LatestMoviesModel {
  constructor() {
    this.apiUrl = 'https://api.themoviedb.org/3/search/movie';
    this.apiToken = process.env.TMDB_API_TOKEN;
    this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    this.movies = [];
  }

  async fetchLatestMovies(page = 1, query = '') {
    const url = query
      ? `${this.apiUrl}?query=${encodeURIComponent(query)}&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const newMovies = data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: `${this.imageBaseUrl}${movie.poster_path}`,
      releaseDate: movie.release_date,
      overview: movie.overview,
      genre: movie.genre_ids.join(', '), // Assuming genre_ids is an array of genre IDs
      rating: movie.vote_average
    }));
    this.movies = [...this.movies, ...newMovies];
    return newMovies;
  }

  getMovieById(id) {
    return this.movies.find((movie) => movie.id === id);
  }
}

export default LatestMoviesModel;
