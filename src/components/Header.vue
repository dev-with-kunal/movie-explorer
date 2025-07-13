<template>
  <header class="relative z-10 px-3 sm:px-4 pt-4 sm:pt-8 pb-4">
    <div class="max-w-6xl mx-auto">
      <!-- Navigation -->
      <nav class="flex items-center justify-between mb-4 sm:mb-6">
        <router-link to="/" class="text-white hover:text-yellow-400 transition-colors">
           <span class="text-base sm:text-lg font-medium">Home</span>
        </router-link>
        
        <button 
          @click="handleFavoritesClick()"
          class="text-white hover:text-yellow-400 transition-colors flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 sm:px-4 py-1.5 sm:py-2 border border-white/20"
        >
          <Heart class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span class="font-medium text-sm sm:text-base hidden xs:inline">My Favorites</span>
          <span class="font-medium text-sm sm:text-base xs:hidden">Favs</span>
          <span class="ml-1 sm:ml-2 bg-yellow-400 text-black text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
            {{ favoriteCount }}
          </span>
        </button>
      </nav>

      <!-- Title Section -->
      <div class="flex items-center justify-center mb-2">
        <Film class="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mr-2 sm:mr-3" />
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
          Movie Explorer
        </h1>
      </div>
      <p class="text-center text-gray-300 text-xs sm:text-sm md:text-base px-2">
        Discover your next favorite movie
      </p>
    </div>
  </header>
</template>

<script>
import { Film, Heart } from 'lucide-vue-next';
import { useFavoriteStore } from '../stores/favoriteStore';

export default {
  name: 'Header',
  components: { Film, Heart },
  emits: ['show-favorites'],
  computed: {
    favoriteStore() {
      return useFavoriteStore();
    },
    favoriteCount() {
      return this.favoriteStore.favorites.length;
    }
  },
  methods: {
    handleFavoritesClick() {
       this.$router.push('/favorites');
    }
  }
};
</script>