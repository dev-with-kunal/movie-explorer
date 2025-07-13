import { createRouter,createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Details from '../views/Details.vue';
import Favorites from '../views/Favorites.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    { 
        path: '/movie/:id', 
        name: 'MovieDetails', 
        component: Details, 
        props: true 
    },
    { 
        path: '/favorites', 
        name: 'Favorites', 
        component: Favorites
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;