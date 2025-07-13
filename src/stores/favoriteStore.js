import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
  }),
  actions: {
    toggleFavorite(movie) {
      const index = this.favorites.findIndex(f => f.id === movie.id);
      if (index === -1) {
        this.favorites.push(movie);
      } else {
        this.favorites.splice(index, 1);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    isFavorite(id) {
      return this.favorites.some(f => f.id === id);
    }
  }
});
