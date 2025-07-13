import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: JSON.parse(localStorage.getItem('cachedMovies') || '[]')
  }),

  actions: {
    addMovie(movie) {
      const exists = this.movies.some(m => m.id === movie.id);
      if (!exists) {
        this.movies.push(movie);
        localStorage.setItem('cachedMovies', JSON.stringify(this.movies));
      }
    },

    getMovieById(id) {
      return this.movies.find(m => m.id === parseInt(id));
    }
  }
});
