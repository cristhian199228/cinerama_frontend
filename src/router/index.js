import { createRouter, createWebHashHistory } from "vue-router";
import AppContainer from "@/AppContainer.vue";
import CarteleraView from '@/views/CarteleraView.vue';
import LoginView from '@/views/LoginView.vue';
import AboutView from "@/views/AboutView.vue";
import AdministradorView from '@/views/AdministradorView.vue';
import CiudadesView from '@/views/administrador/CiudadesView.vue';
import CinesView from '@/views/administrador/CinesView.vue';
import SalasView from '@/views/administrador/SalasView.vue';
import TiposEntradaView from '@/views/administrador/TiposEntradaView.vue';
import PeliculasView from '@/views/administrador/PeliculasView.vue';
import FuncionesView from '@/views/administrador/FuncionesView.vue';
import AgregarPeliculaView from '@/views/administrador/AgregarPeliculaView.vue';

const routes = [
  {
    path: "/login",
    component: LoginView,
    name: "login",
  },
  {
    path: "/",
    component: AppContainer,
    children: [
      {
        path: "",
        component: CarteleraView,
        name: "home",
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/peliculas",
    component: AppContainer,
    children: [
      {
        path: "",
        component: AboutView,
        name: "peliculas",
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/administrador",
    component: AppContainer,
    children: [
      {
        path: "",
        component: AdministradorView,
        name: "administrador",
        meta: { requiresAuth: true },
        children: [
          { path: "ciudades", component: CiudadesView, name: "ciudades" },
          { path: "cines", component: CinesView, name: "cines" },
          { path: "salas", component: SalasView, name: "salas" },
          { path: "tipos-entrada", component: TiposEntradaView, name: "tipos-entrada" },
          { path: "peliculas", component: PeliculasView, name: "peliculas-admin" },
          { path: "funciones", component: FuncionesView, name: "funciones" },
          { path: "peliculas/nuevo", component: AgregarPeliculaView, name: "agregar-pelicula" }, // Nueva ruta para agregar películas
        ],
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
