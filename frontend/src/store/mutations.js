export default {
  changeLayout: (state, value) => {
    state.layout = value;
  },
  changeType: (state, value) => {
    state.selectedType = value;
  },
  changePokemons: (state, value) => {
    state.pokemons = value;
  },
  changeFavoritePokemons: (state, value) => {
    state.favoritePokemons = value;
  },
  changeSearchKeyword: (state, value) => {
    state.searchKeyword = value;
  }
};
