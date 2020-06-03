<template>
  <div id="favorite">
    <b-container class="bv-example-row all-pokemon-view" fluid>
      <Grid
        :unSetFavorite="unSetFavorite"
        :getPokemons="getFavoritePokemons"
        :getLayout="getLayout"
      />
      <List
        :unSetFavorite="unSetFavorite"
        :getPokemons="getFavoritePokemons"
        :getLayout="getLayout"
      />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  GET_FAVORITE_POKEMONS_BY_QUERY,
  UNSET_FAVORITE_POKEMON
} from "@/queries/queries";
import Grid from "@/components/Grid.vue";
import List from "@/components/List.vue";

export default {
  name: "favorite",
  components: {
    Grid,
    List
  },
  computed: {
    ...mapGetters([
      "getPokemons",
      "getFavoritePokemons",
      "getLayout",
      "getType",
      "getSearchKeyword"
    ])
  },
  methods: {
    ...mapActions(["setPokemons", "setFavoritePokemons"]),
    unSetFavorite(pokemon) {
      this.$apollo
        .mutate({
          mutation: UNSET_FAVORITE_POKEMON,
          variables: {
            id: pokemon.id
          }
        })
        .then(() => {
          pokemon.isFavorite = false;
          const updatedFavoritePokemon = this.$store.getters.getFavoritePokemons.filter(
            e => e.id != pokemon.id
          );
          this.$store.dispatch("setFavoritePokemons", updatedFavoritePokemon);
          const updatedAllPokemon = this.$store.getters.getPokemons.filter(
            e => {
              if (e.id === pokemon.id) e.isFavorite = false;
              return true;
            }
          );
          this.$store.dispatch("setPokemons", updatedAllPokemon);
          this.$bvToast.toast(`${pokemon.name} is removed from favorite`, {
            title: `Successfully removed from favorite`,
            toaster: "b-toaster-top-right",
            variant: "success",
            solid: true,
            appendToast: false
          });
        })
        .catch(error => {
          this.error = error;
          alert("E " + error);
        });
    },
    fetchPokemons(search = null, type = null) {
      this.pokemons = this.$apollo
        .query({
          query: GET_FAVORITE_POKEMONS_BY_QUERY,
          fetchPolicy: "no-cache",
          variables: {
            name: search,
            type: type
          }
        })
        .then(data => {
          this.$store.dispatch("setFavoritePokemons", data.data.pokemons.edges);
        })
        .catch(error => {
          this.error = error;
          alert("E " + error);
        });
    }
  },
  watch: {
    getSearchKeyword: function(newVal) {
      this.fetchPokemons(newVal, this.$store.getters.getType);
    },
    getType: function(newVal) {
      this.fetchPokemons(this.$store.getters.getSearchKeyword, newVal);
    }
  },
  mounted() {
    this.fetchPokemons(
      this.$store.getters.getSearchKeyword,
      this.$store.getters.getType
    );
  }
};
</script>
