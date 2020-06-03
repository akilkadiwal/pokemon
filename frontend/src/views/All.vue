<template>
  <div id="js-grid-list">
    <b-container class="bv-example-row all-pokemon-view" fluid>
      <Grid
        :setFavorite="setFavorite"
        :unSetFavorite="unSetFavorite"
        :getPokemons="getPokemons"
        :getLayout="getLayout"
      />
      <List
        :setFavorite="setFavorite"
        :unSetFavorite="unSetFavorite"
        :getPokemons="getPokemons"
        :getLayout="getLayout"
      />
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  GET_POKEMON_BY_QUERY,
  SET_FAVORITE_POKEMON,
  UNSET_FAVORITE_POKEMON
} from "@/queries/queries";
import Grid from "@/components/Grid.vue";
import List from "@/components/List.vue";

export default {
  name: "js-grid-list",
  components: {
    Grid,
    List
  },
  data() {
    return {
      offset: 0
    };
  },
  computed: {
    ...mapGetters([
      "getPokemons",
      "getLayout",
      "getType",
      "getSearchKeyword",
      "getFavoritePokemons"
    ])
  },
  methods: {
    ...mapActions(["setPokemons", "setFavoritePokemons"]),
    setFavorite(pokemon) {
      // Add pokemon to favorite
      this.$apollo
        .mutate({
          mutation: SET_FAVORITE_POKEMON,
          variables: {
            id: pokemon.id
          }
        })
        .then(() => {
          pokemon.isFavorite = true;
          this.$store.dispatch("setFavoritePokemons", [
            ...this.$store.getters.getFavoritePokemons,
            pokemon
          ]);
          this.$bvToast.toast(`${pokemon.name} added to favorite`, {
            title: `Successfully added to favorite`,
            toaster: "b-toaster-top-right",
            variant: "success",
            solid: true,
            appendToast: false
          });
        })
        .catch(error => {
          this.error = error;
          this.$bvToast.toast(
            `Error occured while adding ${pokemon.name} to favorite`,
            {
              title: "Error: ",
              variant: "danger",
              toaster: "b-toaster-top-right",
              solid: true
            }
          );
        });
    },
    unSetFavorite(pokemon) {
      // Remove pokemon from favorite
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
          this.$bvToast.toast(
            `Failed to remove ${pokemon.name} from favorite`,
            {
              title: `Failed to remove from favorite`,
              toaster: "b-toaster-top-right",
              variant: "danger",
              solid: true,
              appendToast: false
            }
          );
        });
    },
    fetchPokemons(search, type, offset) {
      // Fetch pokemons from graphql
      this.pokemons = this.$apollo
        .query({
          query: GET_POKEMON_BY_QUERY,
          fetchPolicy: "no-cache",
          variables: {
            name: search,
            type: type,
            offset: offset
          }
        })
        .then(data => {
          if (offset == 0) {
            this.$store.dispatch("setPokemons", data.data.pokemons.edges);
            return;
          }
          const result = [
            ...this.$store.getters.getPokemons,
            ...data.data.pokemons.edges
          ];

          this.$store.dispatch("setPokemons", result);
        })
        .catch(error => {
          this.error = error;
        });
    },
    scroll() {
      // On page scroll fetching additional pokemons
      window.onscroll = () => {
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 2
        ) {
          this.offset = this.offset + 10;
          this.fetchPokemons(
            this.$store.getters.getSearchKeyword,
            this.$store.getters.getType,
            this.offset
          );
        }
      };
    }
  },
  watch: {
    getSearchKeyword: function(newVal) {
      // Listen to search string and fetch pokemons
      this.offset = 0;
      this.fetchPokemons(newVal, this.$store.getters.getType, this.offset);
    },
    getType: function(newVal) {
      // Listen to type selection and fetch pokemons
      this.offset = 0;
      this.fetchPokemons(
        this.$store.getters.getSearchKeyword,
        newVal,
        this.offset
      );
    }
  },
  mounted() {
    this.offset = 0;
    this.fetchPokemons(
      this.$store.getters.getSearchKeyword,
      this.$store.getters.getType,
      this.offset
    );
    this.scroll();
  }
};
</script>
