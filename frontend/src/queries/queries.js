import gql from "graphql-tag";

export const GET_POKEMON_BY_QUERY = gql`
  query pokemons($name: String, $type: String, $offset: Int) {
    pokemons(
      query: {
        limit: 10
        offset: $offset
        search: $name
        filter: { type: $type }
      }
    ) {
      edges {
        id
        name
        types
        image
        isFavorite
      }
    }
  }
`;

export const GET_FAVORITE_POKEMONS_BY_QUERY = gql`
  query pokemons($name: String, $type: String) {
    pokemons(
      query: {
        limit: 100
        offset: 0
        search: $name
        filter: { type: $type, isFavorite: true }
      }
    ) {
      edges {
        id
        name
        types
        image
        isFavorite
      }
    }
  }
`;

export const SET_FAVORITE_POKEMON = gql`
  mutation favoritePokemon($id: ID!) {
    favoritePokemon(id: $id) {
      id
      name
      types
      image
      isFavorite
    }
  }
`;

export const UNSET_FAVORITE_POKEMON = gql`
  mutation unFavoritePokemon($id: ID!) {
    unFavoritePokemon(id: $id) {
      id
      name
      types
      image
      isFavorite
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  query pokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      name
      types
      image
      sound
      maxCP
      maxHP
      isFavorite
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      evolutions {
        name
        image
        isFavorite
      }
    }
  }
`;
