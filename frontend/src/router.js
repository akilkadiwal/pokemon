import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Favorite from "./views/Favorite.vue";
import Pokemon from "./views/Pokemon.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/all",
      name: "All",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/All.vue")
    },
    {
      path: "/favorite",
      name: "Favorite",
      component: Favorite
    },
    {
      path: "/:name",
      name: "Pokemon",
      component: Pokemon
    }
  ]
});
