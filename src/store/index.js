import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    user: null,
  },
  getters: {
    menus: (state) => (state.user ? state.user.rol.menu : []),
    isAuthenticated(state) {
      return !!state.user;
    }
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
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
    async logout({ dispatch}) {
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
  },
  modules: {
  }
})
