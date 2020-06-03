export default {
  setLayout: ({ commit }, payload) => {
    commit("changeLayout", payload);
  },
  setType: ({ commit }, payload) => {
    commit("changeType", payload);
  },
  setPokemons: ({ commit }, payload) => {
    commit("changePokemons", payload);
  },
  setFavoritePokemons: ({ commit }, payload) => {
    commit("changeFavoritePokemons", payload);
  },
  setSearchKeyword: ({ commit }, payload) => {
    commit("changeSearchKeyword", payload);
  }
};
