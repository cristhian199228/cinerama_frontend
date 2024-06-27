import { createRouter, createWebHashHistory } from "vue-router";
import AppContainer from "@/AppContainer.vue";
import CarteleraView from '@/views/CarteleraView.vue'
import AboutView from "../views/AboutView.vue";

const routes = [
  {
    path: "/",
    component: AppContainer,
    children: [
      {
        path: "",
        component: CarteleraView,
        name: "home",
        meta: { requiresAuth: true },
      }
    ],
  },
  {
    path: "/peliculas",
    component: AppContainer,
    children: [
      {
        path: "",
        component: AboutView ,
        name: "peliculas",
        meta: { requiresAuth: true },
      }
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
