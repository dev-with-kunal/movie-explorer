<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-32">
    <main class="px-4 pt-10">
      <div class="max-w-6xl mx-auto">
        <!-- Stylish Title -->
        <h2
          class="text-center text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 text-transparent bg-clip-text drop-shadow-lg mb-8"
        >
          ★ My Favorite Movies
        </h2>

        <!-- Movie Cards Grid -->
        <div
          v-if="favoriteMovies.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <Cards
            v-for="movie in favoriteMovies"
            :key="movie.id"
            :movie="movie"
          />
        </div>

        <!-- Empty State -->
        <p v-else class="text-center text-white text-base sm:text-lg mt-12 italic opacity-70">
          No favorite movies added yet.
        </p>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import Cards from '../components/Cards.vue';
import { useFavoriteStore } from '../stores/favoriteStore';

export default {
  name: 'Favorites',
  components: {
    Footer,
    Cards
  },
  computed: {
    favoriteMovies() {
      return useFavoriteStore().favorites;
    }
  }
};
</script>

<style scoped>
/* Optional scoped styles */
</style>
