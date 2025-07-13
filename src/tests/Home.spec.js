import { mount, flushPromises } from '@vue/test-utils';
import HomePage from '../views/Home.vue';
import axios from 'axios';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia'; // ✅ NEW

vi.mock('axios');

describe('HomePage.vue - Unit Tests', () => {
  beforeEach(() => {
    const pinia = createPinia();         // create a Pinia instance
    setActivePinia(pinia);               // activate it globally
  });

  it('shows error if all fields are empty on search', async () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [createPinia()],        //Provide Pinia to the component
      }
    });

    await wrapper.vm.handleSearch();
    expect(wrapper.vm.errors.form).toBe('Please fill at least one field to search.');
  });

  it('shows error if title is too short', async () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [createPinia()],
      }
    });

    wrapper.vm.searchData.title = 'a';
    await wrapper.vm.handleSearch();
    expect(wrapper.vm.errors.title).toBe('Movie title must be at least 2 characters.');
  });

  it('shows error if year is out of valid range', async () => {
    const wrapper = mount(HomePage, {
      global: {
        plugins: [createPinia()],
      }
    });

    wrapper.vm.searchData.year = 1500;
    await wrapper.vm.handleSearch();
    expect(wrapper.vm.errors.year).toBe('Please enter a valid year.');
  });
});

describe('HomePage.vue - Integration Test', () => {
  beforeEach(() => {
    axios.get.mockReset();
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it('fetches and displays movies on valid search', async () => {
    axios.get.mockResolvedValue({
      data: {
        results: [
          {
            id: 123,
            title: 'Spider-Man',
            release_date: '2023-05-10',
            genre_ids: [28],
            poster_path: '/spiderman.jpg',
            overview: 'Hero movie'
          }
        ],
        total_pages: 1
      }
    });

    const wrapper = mount(HomePage, {
      global: {
        plugins: [createPinia()], // Pinia injected here too
      }
    });

    wrapper.vm.searchData.title = 'Spider-Man';
    await wrapper.find('form').trigger('submit.prevent');
    await flushPromises();

    expect(wrapper.vm.displayedMovies.length).toBe(1);
    expect(wrapper.html()).toContain('Spider-Man');
  });
});
