# Movie Search App

A modern Vue.js 3 application for searching movies using The Movie Database (TMDB) API. Built with Vite and featuring a clean, responsive interface for discovering and managing your favorite movies.

## Features

- **Movie Search**: Search for movies by title, year, and genre
- **Movie Details**: View detailed information about selected movies
- **Favorites Management**: Add and remove movies from your personal favorites list
- **Responsive Design**: Optimized for desktop and mobile devices
- **Performance Optimized**: Lazy loading, caching, and code splitting implemented

## Tech Stack

- **Vue.js 3** with Options API
- **Vite** for fast development and build tooling
- **Vue Router** for client-side routing
- **Pinia** for global state management
- **Tailwind CSS** for responsive design
- **Vitest** for unit & integration testing

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- TMDB API key (free registration required)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dev-with-kunal/movie-explorer.git
cd movie-search-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
```

### Getting a TMDB API Key:
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings → API
4. Generate your API key

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
npm run preview
# or
yarn build
yarn preview
```

## Development Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm run test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Lint Code
```bash
npm run lint
```

## Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/
```

## Project Structure

```
movie-search-app/
├── src/
│   ├── components/         # Reusable Vue components
│   │   ├── Card.vue
│   │   ├── Footer.vue
│   │   └── Header.vue
│   ├── views/              # Route components
│   │   ├── Home.vue        # Home page with search
│   │   ├── Details.vue     # Movie details page
│   │   └── Favorites.vue   # Favorites page
│   ├── stores/             # Pinia stores
│   │   ├── moviesStore.js
│   │   └── favoriteStore.js
│   ├── router/            # Vue Router configuration
│   │   └── index.js
│   ├── services/          # API services
│   │   └── tmdb.js
│   ├── utils/             # Utility functions
│   └── main.js            # App entry point
├── tests/                 # Test files
├── public/                # Static assets
├── index.html             # HTML entry point
└── vite.config.js         # Vite configuration
```

## Routing

The application implements three main routes:

- `/` - Home page with search functionality
- `/movie/:id` - Individual movie details page
- `/favorites` - User's favorite movies list

Navigation is handled using `<RouterLink>` components for optimal performance.

## Form Handling & Validation

The search form implements:
- **Two-way binding** using `v-model` for reactive form state
- **Validation** ensuring at least one search field is filled
- **Error handling** for API failures and empty results
- **Debounced search** to optimize API calls

## State Management with Pinia

### Favorites Store
```javascript
// stores/favorites.js
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: []
  }),
  actions: {
    addFavorite(movie) {
      // Add movie to favorites
    },
    removeFavorite(movieId) {
      // Remove movie from favorites
    }
  },
  getters: {
    isFavorite: (state) => (movieId) => {
      return state.favorites.some(movie => movie.id === movieId)
    }
  }
})
```

### Movies Store
- **Global state** for search results and movie details
- **Persistent storage** using localStorage
- **Reactive updates** across all components

## Performance Optimizations

### Code Splitting
- **Dynamic imports** for lazy loading components
- **Route-based splitting** using Vue Router

### Caching
- **API response caching** to reduce network requests
- **Image optimization** with responsive sizes
- **Component optimization** using computed properties

### Bundle Optimization
- **Tree shaking** for unused code elimination
- **Asset optimization** for smaller bundle sizes

## Testing with Vitest

### Running Tests

```bash
npm run test
# or
yarn test
```

### Test Coverage

```bash
npm run test:coverage
# or
yarn test:coverage
```

### Test Structure

The test suite covers:
- **Component testing** using Vue Test Utils
- **Store testing** for Pinia stores
- **Integration testing** for user workflows
- **API mocking** for reliable tests

Key test files:
- `tests/components/SearchForm.spec.js`
- `tests/stores/favorites.spec.js`
- `tests/views/HomeView.spec.js`

Example test structure:
```javascript
// tests/components/SearchForm.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchForm from '@/components/SearchForm.vue'

describe('SearchForm', () => {
  it('validates required fields', () => {
    // Test implementation
  })
})
```

## API Integration

### TMDB API Usage

The application integrates with TMDB API for:
- **Movie search** with multiple filters
- **Movie details** retrieval
- **Image fetching** with optimized sizes

### Service Layer
```javascript
// services/tmdb.js
class TMDBService {
  constructor() {
    this.apiKey = import.meta.env.VITE_TMDB_API_KEY
    this.baseURL = import.meta.env.VITE_TMDB_BASE_URL
  }

  async searchMovies(query, options = {}) {
    // API call implementation
  }

  async getMovieDetails(movieId) {
    // API call implementation
  }
}
```

### Error Handling
- **Network errors** with user-friendly messages
- **Rate limiting** awareness and handling
- **Fallback states** for failed requests

## Styling with Tailwind CSS

### Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom theme extensions
    },
  },
  plugins: [],
}
```

### Responsive Design
- **Mobile-first approach** with Tailwind utilities
- **Dark mode support** (optional)
- **Consistent spacing** and typography

Perfect! I've removed all TypeScript references from the README. The tech stack now accurately reflects your setup:

- ✅ **Vue.js 3** with Options API
- ✅ **Vite** for build tooling  
- ✅ **Pinia** for state management
- ✅ **Vitest** for testing
- ✅ **Tailwind CSS** for styling
- ✅ **JavaScript** (no TypeScript)

The README now perfectly matches your actual project configuration!

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Vue.js](https://vuejs.org/) team for the excellent framework
- [Vite](https://vitejs.dev/) for the amazing build tool