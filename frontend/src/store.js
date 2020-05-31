import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemons: [],
    favoritePokemons: [],
    layout: "grid",
    selectedType: '',
    searchKeyword: ''
  },
  getters: {
    getPokemons: (state) => {
      return state.pokemons
    },
    getFavoritePokemons: (state) => {
      return state.favoritePokemons
    },
    getLayout: (state) => {
      return state.layout
    },
    getType: (state) => {
      return state.selectedType
    },
    getSearchKeyword: (state) => {
      return state.searchKeyword
    }
    // other getters
  },
  mutations: {
    changeLayout: (state, value) => {
      state.layout = value
      // state[species].push(pet)
    },
    changeType: (state, value) => {
      state.selectedType = value
    },
    changePokemons: (state, value) => {
      state.pokemons = value
    },
    changeFavoritePokemons: (state, value) => {
      state.favoritePokemons = value
    },
    changeSearchKeyword: (state, value) => {
      state.searchKeyword = value
    }

  },
  actions: {
    setLayout: ({ commit }, payload) => {
      commit('changeLayout', payload)
    },
    setType: ({ commit }, payload) => {
      commit('changeType', payload)
    },
    setPokemons: ({ commit }, payload) => {
      commit('changePokemons', payload)
    },
    setFavoritePokemons: ({ commit }, payload) => {
      commit('changeFavoritePokemons', payload)
    },
    setSearchKeyword: ({ commit }, payload) => {
      commit('changeSearchKeyword', payload)
    }
  }
});
