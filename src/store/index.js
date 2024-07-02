import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user: null,
    tipos_entradas: [],
    peliculas: [],
    salas: [],
    cines: [],
    ciudades: [],
  },
  getters: {
    menus: (state) => (state.user ? state.user.rol.menu : []),
    isAuthenticated(state) {
      return !!state.user;
    },
    cines: (state) => state.cines,
    ciudades: (state) => state.ciudades,
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    SET_SALAS(state, salas) {
      state.salas = salas;
    },
    SET_CINES(state, cines) {
      state.cines = cines;
    },
    SET_CIUDADES(state, ciudades) {
      state.ciudades = ciudades;
    },
    SET_TIPOS_ENTRADAS(state, tipos_entradas) {
      state.tipos_entradas = tipos_entradas;
    },
    SET_PELICULAS(state, peliculas) {
      state.peliculas = peliculas;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      try {
        await axios.post("/login", credentials);
        await dispatch("getUser");
      } catch (e) {
        throw new Error(await e.response.data.message);
      }
    },
    async logout({ dispatch }) {
      try {
        await axios.post("/logout");
        await dispatch("getUser");
      } catch (e) {
        throw new Error(await e.response.data.message);
      }
    },
    async getUser({ commit }) {
      try {
        const { data } = await axios.get("/api/user");
        commit("SET_USER", data);
      } catch (e) {
        commit("SET_USER", null);
        throw new Error(await e.response.data.message);
      }
    },
    async fetchCiudades({ commit }) {
      try {
        const { data } = await axios.get("/api/ciudad");
        commit("SET_CIUDADES", data);
      } catch (e) {
        commit("SET_CIUDADES", []);
        throw new Error(await e.response.data.message);
      }
    },
    async fetchCines({ commit }) {
      try {
        const { data } = await axios.get("/api/cine");
        commit("SET_CINES", data);
      } catch (e) {
        commit("SET_CINES", []);
        throw new Error(await e.response.data.message);
      }
    },
    async fetchSalas({ commit }) {
      try {
        const { data } = await axios.get("/api/sala");
        commit("SET_SALAS", data);
      } catch (e) {
        commit("SET_SALAS", []);
        throw new Error(await e.response.data.message);
      }
    },
    async fetchTiposEntradas({ commit }) {
      try {
        const { data } = await axios.get("/api/tipoentrada");
        commit("SET_TIPOS_ENTRADAS", data);
      } catch (e) {
        commit("SET_TIPOS_ENTRADAS", []);
        throw new Error(await e.response.data.message);
      }
    },
    async fetchPeliculas({ commit }) {
      try {
        const { data } = await axios.get("/api/pelicula");
        commit("SET_PELICULAS", data);
      } catch (e) {
        commit("SET_PELICULAS", []);
        throw new Error(await e.response.data.message);
      }
    },
    async BuscarPelicula(_, { query }) {
      try {
        let response;

        response = await axios.get(`/api/buscarPelicula`, {
          params: { query },
          headers: {
            Authorization: "Bearer tu-token-de-autorizacion",
            accept: "application/json",
          },
        });
        return response;
      } catch (error) {
        console.error("Error fetching movie from backend:", error);
        throw error;
      }
    },
  },
  modules: {},
});
