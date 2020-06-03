<template>
  <section class="grid-list" v-cloak>
    <b-card-group>
      <b-card no-body class="mb-2 pokemon-card-container">
        <b-container>
          <b-row>
            <b-col sm="1" md="1">
              <b-icon
                @click="playSound(pokemon.sound)"
                icon="volume-up-fill"
                class="sound-icon"
                font-scale="3"
              ></b-icon>
            </b-col>
            <b-col sm="8" md="10">
              <b-embed type="video" aspect="4by3" autoplay loop>
                <source
                  v-if="pokemon.name"
                  :src="videoSource"
                  type="video/mp4"
                />
              </b-embed>
            </b-col>
          </b-row>
        </b-container>
        <b-card-body>
          <div class="pokemon-name">
            <h4>{{ pokemon.name }}</h4>
            <small>{{ pokemon.types ? pokemon.types.join(",") : "" }}</small>
            <span>
              <transition
                name="bounce"
                mode="in-out"
                :duration="{ enter: 500, leave: 800 }"
              >
                <b-icon
                  icon="heart"
                  v-if="pokemon.isFavorite == false"
                ></b-icon>
                <b-icon icon="heart-fill" v-else></b-icon>
              </transition>
            </span>
            <div class="health-combat-bar">
              <b-progress
                value="100"
                max="100"
                variant="warning"
                class="mb-3"
              ></b-progress>
              <div class="health-combat-value">CP: {{ pokemon.maxCP }}</div>
            </div>
            <div class="health-combat-bar">
              <b-progress
                value="100"
                max="100"
                variant="success"
                class="mb-3"
              ></b-progress>
              <div class="health-combat-value">HP: {{ pokemon.maxHP }}</div>
            </div>
          </div>

          <div class="flex-container">
            <div>
              <p>
                <b>Weight</b>
              </p>
              <span>
                {{ pokemon.weight ? pokemon.weight.minimum : "" }} -
                {{ pokemon.weight ? pokemon.weight.maximum : "" }}
              </span>
            </div>
            <div>
              <p>
                <b>Height</b>
              </p>
              <span>
                {{ pokemon.height ? pokemon.height.minimum : "" }} -
                {{ pokemon.height ? pokemon.height.maximum : "" }}
              </span>
            </div>
          </div>
        </b-card-body>
      </b-card>
      <b-container class="evolution-container" fluid>
        <b-row class="row-no-gutters">
          <b-col sm="3">
            <h5>Evolutions</h5>
          </b-col>
        </b-row>
        <b-row class="row-no-gutters grid">
          <b-col
            sm="3"
            md="3"
            v-for="(ePokemon, index) in pokemon.evolutions"
            :key="index"
          >
            <b-card no-body>
              <b-card-img
                :src="ePokemon.image"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 15rem;"
                class="mb-2"
              ></b-card-img>
              <b-card-body>
                <p>
                  <b>{{ ePokemon.name }}</b>
                </p>

                <span style="float:right; margin-top:1px;">
                  <b-icon
                    icon="heart"
                    v-if="ePokemon.isFavorite == false"
                    v-on:click="setFavorite(pokemon)"
                  ></b-icon>
                  <b-icon
                    icon="heart-fill"
                    v-if="ePokemon.isFavorite == true"
                    v-on:click="unSetFavorite(pokemon)"
                  ></b-icon>
                </span>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </b-card-group>
  </section>
</template>

<script>
import Vue from "vue";
import { BProgress } from "bootstrap-vue";
import { GET_POKEMON_BY_NAME } from "@/queries/queries";
Vue.component("b-progress", BProgress);

export default {
  props: {
    name: String
  },
  data() {
    return {
      pokemon: ""
    };
  },
  methods: {
    // Play sound of pokemon
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  },
  computed: {
    // Check to fetch pokemon video href link
    videoSource: function() {
      if (this.pokemon.name === "Nidoran-F")
        return "https://db.pokemongohub.net/videos/Nidoran_Female-small.mp4";
      if (this.pokemon.name === "Nidoran-M")
        return "https://db.pokemongohub.net/videos/Nidoran_Male-small.mp4";

      const videoHref =
        "https://db.pokemongohub.net/videos/" +
        this.pokemon.name +
        "-small.mp4";
      return videoHref;
    }
  },
  mounted() {
    let PokemonName = this.$route.params.name;
    if (!PokemonName) {
      PokemonName = this.name;
    }
    this.$apollo
      .query({
        query: GET_POKEMON_BY_NAME,
        variables: {
          name: PokemonName
        }
      })
      .then(data => {
        this.pokemon = data.data.pokemonByName;
      })
      .catch(error => {
        this.error = error;
        alert("E " + error);
      });
  }
};
</script>
