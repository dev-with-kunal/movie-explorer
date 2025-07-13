<template>
  <div
    class="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:bg-white/20 transition-all duration-300 group cursor-pointer relative"
    @click="handleClick"
  >
    <!-- Favorite Icon -->
    <button
      @click.stop="toggleFavorite"
      class="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-200 group-hover:scale-110"
      :class="{ 'text-red-500': isFavorite, 'text-white hover:text-white': !isFavorite }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 transition-all duration-200 drop-shadow-lg"
        :class="{ 'fill-current': isFavorite }"
        :fill="isFavorite ? 'currentColor' : 'none'"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>

    <img
      :src="movie.image"
      class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
      alt="Movie Poster"
    />
    <div class="p-4">
      <h3 class="text-white font-semibold text-lg mb-1 truncate">{{ movie.title }}</h3>
      <p class="text-gray-300 text-sm mb-2">{{ movie.year }} • {{ movie.genre }}</p>
      <p class="text-gray-300 text-sm line-clamp-3">{{ movie.description }}</p>
    </div>
  </div>
</template>

<script>
import { useFavoriteStore } from '../stores/favoriteStore';

export default {
  name: 'Cards',
  props: {
    movie: { type: Object, required: true }
  },
  emits: ['openDetails'],
  computed: {
    favoriteStore() {
      return useFavoriteStore();
    },
    isFavorite() {
      return this.favoriteStore.isFavorite(this.movie.id);
    }
  },
  methods: {
    handleClick() {
      this.$emit('openDetails', this.movie);
    },
    toggleFavorite() {
      this.favoriteStore.toggleFavorite(this.movie);
    }
  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>