<template>
  <div v-if="getLayout === 'list'">
    <b-row v-for="(pokemon, index) in getPokemons" :key="index" no-gutters>
      <b-card
        :img-src="pokemon.image"
        img-alt="Card image"
        img-left
        style="width: 100%;"
        class="mb-2"
      >
        <b-card-text align="left">
          <p>{{ pokemon.name }}</p>
          <small>{{ pokemon.types.join(",") }}</small>
          <span style="float:right, margin-top: -10px">
            <b-icon
              icon="info-circle"
              class
              v-b-modal="'modal-' + pokemon.id"
            ></b-icon>
            <b-modal size="lg" :id="'modal-' + pokemon.id">
              <Pokemon :name="pokemon.name" />
            </b-modal>
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
        </b-card-text>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import Pokemon from "@/views/Pokemon.vue";
export default {
  props: {
    setFavorite: Function,
    unSetFavorite: Function,
    getPokemons: Array,
    getLayout: String
  },
  components: {
    Pokemon
  }
};
</script>
