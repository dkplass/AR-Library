import axios from "axios";

const state = {
  menu: [],
  currentMenuSet: null
};

const actions = {
  getMenu({ commit }) {
    const api = `${process.env.VUE_APP_BASE_API}/api/Menu/GetList`;

    axios
      .get(api)
      .then(response => {
        const result = JSON.parse(response.data.Resource);
        commit("setMenu", result);
      })
      .catch(console.error());
  }
};

const mutations = {
  setMenu(state, payload) {
    state.menu = payload;
  },
  setCurrentMenuSet(state, payload) {
    state.currentMenuSet = payload;
  }
};

const getters = {
  menu(state) {
    return state.menu;
  },
  currentMenuSet(state) {
    return state.currentMenuSet;
  }
};

export const menu = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
