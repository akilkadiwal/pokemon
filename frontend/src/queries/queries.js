import gql from "graphql-tag";


export const GET_POKEMON = gql`
      query {
        pokemons(query: { limit: 100, offset: 0 }) {
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

export const GET_POKEMONS_BY_TYPE = gql`
    query pokemons($name: String, $type: String) {
      pokemons(
        query: {
          limit: 100
          offset: 0
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

export const GET_POKEMONS_BY_NAME = gql`
query pokemons($name: String, $type: String) {
  pokemons(
    query: {
      limit: 100
      offset: 0
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
