<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-32">
    <Header />

    <main class="relative z-10 px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Search Form -->
        <form @submit.prevent="handleSearch" class="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8 mb-8">
          <div class="space-y-6">
            <!-- Title -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-200 flex items-center">
                <Search class="w-4 h-4 mr-2" /> Movie Title
              </label>
              <input
                v-model="searchData.title"
                type="text"
                placeholder="Enter movie title..."
                class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <p v-if="errors.title" class="text-red-400 text-sm mt-1">{{ errors.title }}</p>
            </div>

            <!-- Year & Genre -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200 flex items-center">
                  <Calendar class="w-4 h-4 mr-2" /> Release Year
                </label>
                <input
                  v-model="searchData.year"
                  type="number"
                  placeholder="e.g., 2023"
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <p v-if="errors.year" class="text-red-400 text-sm mt-1">{{ errors.year }}</p>
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-200 flex items-center">
                  <Star class="w-4 h-4 mr-2" /> Genre
                </label>
                <select
                  v-model="searchData.genre"
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="" class="bg-slate-800 text-white">All Genres</option>
                  <option
                    v-for="genre in genres"
                    :key="genre"
                    :value="genre"
                    class="bg-slate-800 text-white"
                  >
                    {{ genre }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                class="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg flex items-center justify-center"
              >
                <Search class="w-5 h-5 mr-2" /> Search Movies
              </button>
              <button
                type="button"
                @click="handleClear"
                class="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl border border-white/30"
              >
                Clear
              </button>
            </div>

            <p v-if="errors.form" class="text-red-400 text-sm mt-2">{{ errors.form }}</p>
          </div>
        </form>

        <!-- Movie Cards -->
        <div v-if="displayedMovies.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Cards
            v-for="movie in displayedMovies"
            :key="movie.id"
            :movie="movie"
            @openDetails="goToDetails"
          />
        </div>

        <div v-if="isLoading" class="text-center text-white mt-8">Loading more movies...</div>
        <div v-if="!isLoading && displayedMovies.length === 0 && hasSearched" class="text-center text-gray-300 mt-8">
          No movies found.
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Cards from '../components/Cards.vue';
import axios from 'axios';
import { Search, Calendar, Star } from 'lucide-vue-next';
import { useMovieStore } from '../stores/movieStore';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default {
  name: 'HomePage',
  components: { Header, Footer, Cards, Search, Calendar, Star },
  data() {
    return {
      displayedMovies: [],
      searchData: { title: '', year: '', genre: '' },
      page: 1,
      totalPages: null,
      isLoading: false,
      hasSearched: false,
      errors: {},
      selectedGenreId: '',
      genres: [
        'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
        'Drama', 'Family', 'Fantasy', 'Horror', 'Mystery', 'Romance',
        'Science Fiction', 'Thriller', 'War', 'Western'
      ]
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    'searchData.genre'(val) {
      const genreMap = {
        'Action': 28, 'Adventure': 12, 'Animation': 16, 'Comedy': 35, 'Crime': 80,
        'Documentary': 99, 'Drama': 18, 'Family': 10751, 'Fantasy': 14, 'Horror': 27,
        'Mystery': 9648, 'Romance': 10749, 'Science Fiction': 878,
        'Thriller': 53, 'War': 10752, 'Western': 37
      };
      this.selectedGenreId = genreMap[val] || '';
    }
  },
  methods: {
    async goToDetails(movie) {
      const movieStore = useMovieStore();
      try {
        if (!movieStore.movies.some(m => m.id === movie.id)) {
          const response = await axios.get(`${BASE_URL}/movie/${movie.id}`, {
            params: {
              api_key: API_KEY,
              language: 'en-US'
            }
          });
          movieStore.addMovie(response.data);
        }

        const detailURL = `${window.location.origin}/movie/${movie.id}`;
        window.open(detailURL, '_blank');
      } catch (error) {
        console.error('Error fetching movie details:', error);
        if (!movieStore.movies.some(m => m.id === movie.id)) {
          movieStore.addMovie(movie);
        }

        const detailURL = `${window.location.origin}/movie/${movie.id}`;
        window.open(detailURL, '_blank');
      }
    },
    validateForm() {
      this.errors = {};
      const { title, year, genre } = this.searchData;
      if (!title && !year && !genre) {
        this.errors.form = 'Please fill at least one field to search.';
        return false;
      }
      if ((title && title.length < 2) || title === '') {
        this.errors.title = 'Movie title must be at least 2 characters.';
      }
      if (year && (year < 1800 || year > new Date().getFullYear())) {
        this.errors.year = 'Please enter a valid year.';
      }
      return Object.keys(this.errors).length === 0;
    },
    async fetchMovies(reset = false) {
      if (this.isLoading || (this.totalPages && this.page > this.totalPages)) return;
      this.isLoading = true;
      try {
        const endpoint = '/search/movie';
        const params = {
          api_key: API_KEY,
          language: 'en-US',
          page: this.page
        };

        if (this.searchData.title) params.query = this.searchData.title;
        if (this.searchData.year) params.year = this.searchData.year;

        const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
        let movies = response.data.results;
        this.totalPages = response.data.total_pages;

        if (this.searchData.year) {
          movies = movies.filter(m => m.release_date?.startsWith(this.searchData.year));
        }
        if (this.selectedGenreId) {
          movies = movies.filter(m => m.genre_ids.includes(this.selectedGenreId));
        }

        const mapped = movies.map(movie => ({
          id: movie.id,
          title: movie.title,
          year: movie.release_date?.split('-')[0] || 'N/A',
          genre: this.searchData.genre || 'N/A',
          image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image',
          description: movie.overview || 'No description available.'
        }));

        if (reset) {
          this.displayedMovies = mapped;
        } else {
          this.displayedMovies.push(...mapped);
        }

        this.page++;
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    handleSearch() {
      this.hasSearched = true;
      if (!this.validateForm()) return;
      this.page = 1;
      this.totalPages = null;
      this.displayedMovies = [];
      this.fetchMovies(true);
    },
    handleClear() {
      this.searchData = { title: '', year: '', genre: '' };
      this.page = 1;
      this.totalPages = null;
      this.errors = {};
      this.displayedMovies = [];
      this.hasSearched = false;
    },
    handleScroll() {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (nearBottom) this.fetchMovies();
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
