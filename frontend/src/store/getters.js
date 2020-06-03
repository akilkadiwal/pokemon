export default {
  getPokemons: state => {
    return state.pokemons;
  },
  getFavoritePokemons: state => {
    return state.favoritePokemons;
  },
  getLayout: state => {
    return state.layout;
  },
  getType: state => {
    return state.selectedType;
  },
  getSearchKeyword: state => {
    return state.searchKeyword;
  }
};
