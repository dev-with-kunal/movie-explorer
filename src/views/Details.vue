<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-32">
    <Header />

    <main class="max-w-6xl mx-auto px-4 py-12">
      <div v-if="isLoading" class="text-center text-white text-lg">Loading movie details...</div>

      <div v-else-if="movie" class="flex flex-col md:flex-row gap-8">
        <!-- Poster -->
        <img
          :src="posterUrl"
          alt="Movie Poster"
          class="w-full md:w-1/3 rounded-xl shadow-lg object-cover"
        />

        <!-- Info -->
        <div class="flex-1 space-y-4">
          <h1 class="text-4xl font-bold">
            {{ movie.title }} <span class="text-lg font-normal text-gray-300">({{ movie.release_date }})</span>
          </h1>

          <p class="text-yellow-400 italic" v-if="movie.tagline">{{ movie.tagline }}</p>

          <p class="text-sm text-gray-300">{{ movie.status }} | {{ movie.runtime }} min | ⭐ {{ movie.vote_average }} / 10</p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="genre in movie.genres"
              :key="genre.id"
              class="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm"
            >
              {{ genre.name }}
            </span>
          </div>

          <p class="text-base leading-relaxed mt-4">{{ movie.description }}</p>

          <div class="pt-6 text-sm space-y-1 text-gray-300">
            <p><strong>Language:</strong> {{ languageDisplay }}</p>
            <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
            <p><strong>Budget:</strong> ${{ formatNumber(movie.budget) }}</p>
            <p><strong>Revenue:</strong> ${{ formatNumber(movie.revenue) }}</p>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-red-400 text-lg mt-10">
        Movie not found. Please go back to the home page.
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import axios from 'axios';
import { useMovieStore } from '../stores/movieStore';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default {
  name: 'MovieDetails',
  components: { Header, Footer },
  data() {
    return {
      movie: null,
      isLoading: true
    };
  },
  computed: {
        posterUrl() {
            return this.movie?.poster_path
              ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
              : 'https://via.placeholder.com/300x450?text=No+Image';
        },

        languageDisplay() {
            if (!this.movie || !this.movie.spoken_languages) return 'N/A';
            return this.movie.spoken_languages
              .map(lang => `${lang.english_name} (${lang.name})`)
              .join(', ');
        }
  },
  methods: {
    async fetchAndCacheMovie(id) {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY, language: 'en-US' }
        });

        const data = response.data;

        const mappedMovie = {
          id: data.id,
          title: data.title,
          release_date: data.release_date?.split('-')[0] || 'N/A',
          releaseDate: data.release_date || 'N/A',
          description: data.overview || 'No description available.',
          tagline: data.tagline,
          vote_average: data.vote_average.toFixed(1),
          runtime: data.runtime || 'N/A',
          status: data.status,
          budget: data.budget || 0,
          revenue: data.revenue || 0,
          genres: data.genres || [],
          spoken_languages: data.spoken_languages,
          poster_path: data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Image'
        };
        const store = useMovieStore();
        store.addMovie(mappedMovie);
        this.movie = mappedMovie;
      } catch (err) {
        console.error('Error fetching movie:', err);
      } finally {
        this.isLoading = false;
      }
    },

    formatNumber(num) {
      return Number(num).toLocaleString();
    }
  },
  mounted() {
    const id = this.$route.params.id;
    const store = useMovieStore();

    const cachedMovie = store.getMovieById(id);
    if (cachedMovie) {
        console.log('Using cached movie:', cachedMovie);
      this.movie = cachedMovie;
      this.isLoading = false;
    } else {
      this.fetchAndCacheMovie(id);
    }
  }
};
</script>

<style scoped>
/* Optional additional styles */
</style>
