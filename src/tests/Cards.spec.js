import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import Cards from '../components/Cards.vue';
import { useFavoriteStore } from '../stores/favoriteStore';

const mockMovie = {
  id: 1,
  title: 'Interstellar',
  year: '2014',
  genre: 'Sci-Fi',
  description: 'Space and time journey',
  image: 'https://via.placeholder.com/300x450?text=Interstellar'
};

describe('Cards.vue - Favorite Feature', () => {
  let pinia;
  let favoriteStore;

  beforeEach(() => {
    // 💡 Reset state before each test
    localStorage.clear();
    pinia = createPinia();
    setActivePinia(pinia);
    favoriteStore = useFavoriteStore();
  });

  it('adds a movie to favorites when not already favorited', () => {
    favoriteStore.toggleFavorite(mockMovie);
    expect(favoriteStore.favorites).toHaveLength(1);
    expect(favoriteStore.isFavorite(mockMovie.id)).toBe(true);
  });

  it('removes a movie from favorites if already favorited', () => {
    favoriteStore.toggleFavorite(mockMovie); // Add
    favoriteStore.toggleFavorite(mockMovie); // Remove
    expect(favoriteStore.favorites).toHaveLength(0);
    expect(favoriteStore.isFavorite(mockMovie.id)).toBe(false);
  });

  it('toggles favorite status on icon click', async () => {
    const wrapper = mount(Cards, {
      props: { movie: mockMovie },
      global: { plugins: [pinia] }
    });

    const favButton = wrapper.find('button');

    // Not favorited at first
    expect(favoriteStore.isFavorite(mockMovie.id)).toBe(false);

    await favButton.trigger('click');
    expect(favoriteStore.isFavorite(mockMovie.id)).toBe(true);

    await favButton.trigger('click');
    expect(favoriteStore.isFavorite(mockMovie.id)).toBe(false);
  });

  it('emits openDetails when card is clicked', async () => {
    const wrapper = mount(Cards, {
      props: { movie: mockMovie },
      global: { plugins: [pinia] }
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('openDetails');
    expect(wrapper.emitted('openDetails')[0]).toEqual([mockMovie]);
  });
});
