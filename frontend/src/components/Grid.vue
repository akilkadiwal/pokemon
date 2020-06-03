<template>
  <div>
    <b-row v-if="getLayout === 'grid'" class="row-no-gutters grid">
      <b-col sm="4" md="4" v-for="(pokemon, index) in getPokemons" :key="index">
        <b-card no-body>
          <b-card-img
            v-bind:src="pokemon.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          ></b-card-img>
          <b-card-body>
            <b-link to="/">
              <router-link :to="`/${pokemon.name}`">
                <h4>{{ pokemon.name }}</h4>
              </router-link>
            </b-link>
            <p class="card-text">
              <small>
                <b-badge
                  :class="'tag-' + index"
                  v-for="(type, index1) in pokemon.types"
                  :key="index1"
                  variant="info"
                  >{{ type }}</b-badge
                >
              </small>
              <span>
                <b-icon
                  icon="info-circle"
                  class
                  v-b-modal="'modal-' + pokemon.id"
                ></b-icon>
                <b-modal size="lg" :id="'modal-' + pokemon.id">
                  <Pokemon :name="pokemon.name" />
                </b-modal>
                <transition
                  name="bounce"
                  mode="in-out"
                  :duration="{ enter: 500, leave: 800 }"
                >
                  <b-icon
                    icon="heart"
                    v-if="pokemon.isFavorite == false"
                    v-on:click="setFavorite(pokemon)"
                  ></b-icon>
                  <b-icon
                    icon="heart-fill"
                    v-else
                    v-on:click="unSetFavorite(pokemon)"
                  ></b-icon>
                </transition>
              </span>
            </p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-icon
        icon="arrow-up-circle-fill"
        v-if="getPokemons.length > 20"
        font-scale="5"
        class="scroll-to-top"
        v-on:click="scrollToTop"
      ></b-icon>
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
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>
