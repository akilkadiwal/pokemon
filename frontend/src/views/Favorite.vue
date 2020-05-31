<template>
  <div id="favorite">
    <!-- {{searchParam}} -->
    <!-- Vue.js lets us choose which UL to show depending on the "layout" variable -->
    <b-container class="bv-example-row" fluid>
      <b-row v-if="getLayout === 'grid'" class="row-no-gutters grid">
        <b-col sm="4" md="4" v-for="(pokemon,index) in getFavoritePokemons" :key="index">
          <b-card
            :title="pokemon.name"
            v-bind:img-src="pokemon.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <small>{{pokemon.types.join(",")}}</small>
            <span style="float:right, margin-top: -10px">
              <b-icon
                icon="heart"
                v-if="pokemon.isFavorite == false"
                v-on:click="setFavorite(pokemon)"
              ></b-icon>
              <b-icon
                icon="heart-fill"
                v-if="pokemon.isFavorite == true"
                v-on:click="unSetFavorite(pokemon)"
              ></b-icon>
            </span>
          </b-card>
        </b-col>
      </b-row>
      <div v-if="getLayout === 'list'">
        <b-row v-for="(pokemon,index) in getFavoritePokemons" :key="index" no-gutters>
          <b-card
            :img-src="pokemon.image"
            img-alt="Card image"
            img-left
            style="width: 100%;"
            class="mb-2"
          >
            <b-card-text align="left">
              <p>{{pokemon.name}}</p>
              <small>{{pokemon.types.join(",")}}</small>
              <span style="float:right, margin-top: -10px">
                <b-icon
                  icon="heart-fill"
                  v-if="pokemon.isFavorite == true"
                  v-on:click="unSetFavorite(pokemon)"
                ></b-icon>
              </span>
            </b-card-text>
          </b-card>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "favorite",
  props: {
    // searchParam: String
  },
  computed: {
    ...mapGetters([
      "getFavoritePokemons",
      "getLayout",
      "getType",
      "getSearchKeyword"
    ])
  },
  methods: {
    ...mapActions(["setFavoritePokemons"]),
    // setFavorite(pokemon) {
    //     this.$apollo
    //     .mutate({
    //       mutation: gql`
    //         mutation favoritePokemon($id: ID!) {
    //           favoritePokemon(id:$id) {
    //             id
    //             name
    //             types
    //             image
    //             isFavorite
    //           }
    //         }
    //       `,

    //       variables: {
    //         id: pokemon.id,
    //       }
    //     })
    //     .then(data => {
    //       pokemon.isFavorite = true
    //     })
    //     .catch(error => {
    //       this.error = error;
    //       alert("E " + error);
    //     });
    // },
    unSetFavorite(pokemon) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation unFavoritePokemon($id: ID!) {
              unFavoritePokemon(id: $id) {
                id
                name
                types
                image
                isFavorite
              }
            }
          `,
          variables: {
            id: pokemon.id
          }
        })
        .then(data => {
          pokemon.isFavorite = false;
          const updatedFavoritePokemon = this.$store.getters.getFavoritePokemons.filter(
            e => e.id != pokemon.id
          );
          this.$store.dispatch("setFavoritePokemons", updatedFavoritePokemon);
        })
        .catch(error => {
          this.error = error;
          alert("E " + error);
        });
    }
  },
  watch: {
    getSearchKeyword: function(newVal, oldVal) {
      //console.log(getSearchKeyword);
      console.log(this.$store.getters.getType);
      this.pokemons = this.$apollo
        .query({
          query: gql`
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
          `,

          variables: {
            name: newVal,
            type: this.$store.getters.getType
          }
        })
        .then(data => {
          console.log(data);
          this.$store.dispatch("setFavoritePokemons", data.data.pokemons.edges);
        })
        .catch(error => {
          this.error = error;
          alert("E " + error);
        });
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    },
    getType: function(newVal, oldVal) {
      //console.log(getSearchKeyword);
      console.log(this.$store.getters.getSearchKeyword);
      this.pokemons = this.$apollo
        .query({
          query: gql`
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
          `,

          variables: {
            name: this.$store.getters.getSearchKeyword,
            type: newVal
          }
        })
        .then(data => {
          console.log(data);
          this.$store.dispatch("setFavoritePokemons", data.data.pokemons.edges);
        })
        .catch(error => {
          this.error = error;
          alert("E " + error);
        });
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
    }
  },
  created() {
    this.$apollo
      .query({
        query: gql`
          query {
            pokemons(
              query: { limit: 100, offset: 0, filter: { isFavorite: true } }
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
        `
      })
      .then(data => {
        console.log(data);
        this.$store.dispatch("setFavoritePokemons", data.data.pokemons.edges);
      })
      .catch(error => {
        this.error = error;
        alert("E " + error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

  /* @import '/assets/sass/home.css'; */



