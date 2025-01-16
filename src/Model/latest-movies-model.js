class LatestMoviesModel {
  constructor() {
    this.apiUrl = 'https://api.themoviedb.org/3/movie/now_playing';
    this.apiToken = process.env.TMDB_API_TOKEN;
    this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  }

  async fetchLatestMovies() {
    const response = await fetch(`${this.apiUrl}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterPath: `${this.imageBaseUrl}${movie.poster_path}`,
      releaseDate: movie.release_date
    }));
  }
}

export default LatestMoviesModel;
