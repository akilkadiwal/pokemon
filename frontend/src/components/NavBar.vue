<template>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input
        class="lg search"
        placeholder="Search"
        v-model="search"
        v-on:keyup="searchPokemon"
      ></b-form-input>
    </b-nav-form>
    <b-nav-form>
      <v-select
        id="exampleInput3"
        :options="pokemonTypes"
        required
        v-model="selectedType"
        @input="changeType"
        placeholder="Type"
      ></v-select>
    </b-nav-form>
    <div class="tool-bar">
      <b-icon
        font-scale="2"
        icon="list"
        v-on:click="changeValue('list')"
        v-bind:class="{ active: getLayout == 'list' }"
      ></b-icon>
      <b-icon
        font-scale="2"
        icon="grid3x2-gap-fill"
        v-on:click="changeValue('grid')"
        v-bind:class="{ active: getLayout == 'grid' }"
      ></b-icon>
    </div>
  </b-navbar>
</template>

<script>
import Vue from "vue";
import gql from "graphql-tag";
import vSelect from "vue-select";
import { mapActions, mapGetters } from "vuex";
Vue.component("v-select", vSelect);

const GET_TYPES = gql`
  query {
    pokemonTypes
  }
`;

export default {
  name: "nav-bar",
  data() {
    return {
      search: "",
      pokemonTypes: [],
      selectedType: ""
    };
  },
  apollo: {
    pokemonTypes: {
      query: GET_TYPES
    }
  },
  computed: {
    ...mapGetters(["getLayout", "getType", "getSearchKeyword"])
  },
  created() {
    this.selectedType = this.$store.getters.getType;
    this.search = this.$store.getters.getSearchKeyword;
  },
  methods: {
    ...mapActions(["setLayout", "setType", "setSearchKeyword"]),
    changeValue(value) {
      this.setLayout(value);
    },
    changeType() {
      this.setType(this.selectedType);
    },
    searchPokemon() {
      this.setSearchKeyword(this.search);
    }
  }
};
</script>
