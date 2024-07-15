import { createRouter, createWebHashHistory } from "vue-router";
import AppContainer from "@/AppContainer.vue";
import CarteleraView from '@/views/CarteleraView.vue';
import LoginView from '@/views/LoginView.vue';
import PeliculasUsuarioView from "@/views/PeliculasView.vue";
import CinesUsuarioView from '@/views/CinesView.vue';
import AdministradorView from '@/views/AdministradorView.vue';
import CiudadesView from '@/views/administrador/CiudadesView.vue';
import CinesView from '@/views/administrador/CinesView.vue';
import SalasView from '@/views/administrador/SalasView.vue';
import TiposEntradaView from '@/views/administrador/TiposEntradaView.vue';
import PeliculasView from '@/views/administrador/PeliculasView.vue';
import FuncionesView from '@/views/administrador/FuncionesView.vue';
import AgregarPeliculaView from '@/views/administrador/AgregarPeliculaView.vue';
import DetallePeliculaView from '@/views/DetallePeliculaView.vue'; // Importar la nueva vista

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
        component: PeliculasUsuarioView,
        name: "peliculas",
        meta: { requiresAuth: true },
      },
      {
        path: "detallepelicula/:idpelicula",
        component: DetallePeliculaView,
        name: "detalle-pelicula",
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/cines",
    component: AppContainer,
    children: [
      {
        path: "",
        component: CinesUsuarioView,
        name: "cines",
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
          { path: "cines", component: CinesView, name: "cines-admin" },
          { path: "salas", component: SalasView, name: "salas" },
          { path: "tipos-entrada", component: TiposEntradaView, name: "tipos-entrada" },
          { path: "peliculas", component: PeliculasView, name: "peliculas-admin" },
          { path: "funciones", component: FuncionesView, name: "funciones" },
          { path: "peliculas/nuevo", component: AgregarPeliculaView, name: "agregar-pelicula" },
        ],
      },
    ],
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
