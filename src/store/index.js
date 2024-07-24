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
    funciones: [],
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
    SET_FUNCIONES(state, funciones) {
      state.funciones = funciones;
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
    async fetchSalasById(_, id) {
      const { data } = await axios.get(`/api/salaById/${id}`);
      // console.log(data)
      return data;
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
    async fetchFunciones({ commit }) {
      try {
        const { data } = await axios.get("/api/funcion");
        commit("SET_FUNCIONES", data);
      } catch (e) {
        commit("SET_FUNCIONES", []);
        throw new Error(await e.response.data.message);
      }
    },
    async BuscarPelicula(_, pelicula) {
      try {
        return await axios.post(`/api/buscarPelicula`, pelicula);
      } catch (error) {
        console.error("Error fetching movie from backend:", error);
        throw error;
      }
    },
    async fetchPeliculaById(_, id) {
      try {
        return await axios.post(`/api/buscarPeliculaPorId`, id);
      } catch (error) {
        console.error("Error fetching movie from backend:", error);
        throw error;
      }
    },
    async fetchPeliculaDetails(_, peliculaId) {
      try {
        return await axios.get(`/api/pelicula/${peliculaId}`);
      } catch (error) {
        console.error("Error fetching movie from backend:", error);
        throw error;
      }
    },
    async saveFuncion(_, form) {
      return await axios.post(`/api/funcion`, form);
    },
    async addPelicula({ commit }, pelicula) {
      try {
        const response = await axios.post("/api/pelicula", {
          titulo: pelicula.titulo,
          director: pelicula.director,
          fecha_estreno: pelicula.fecha_estreno,
          duracion: pelicula.duracion,
          sinopsis: pelicula.sinopsis,
          codigo_api: pelicula.codigo_api, // Asumiendo que este campo debe ser manejado también
          poster_path_api: pelicula.poster_path_api,
          wallpaper_path_api: pelicula.wallpaper_path_api,
          trailer_path_api: pelicula.trailer_path_api,
        });
        commit("ADD_PELICULA", response.data);
      } catch (error) {
        console.error("Error adding movie:", error);
      }
    },
    async fetchFuncionDetails(_,id) {
      try {
        return await axios.get(`/api/funcion/${id}`);
      } catch (error) {
        console.error("Error fetching movie from backend:", error);
        throw error;
      }
    },
  },

  modules: {},
});
