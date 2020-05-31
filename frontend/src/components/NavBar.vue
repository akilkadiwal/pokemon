<template>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input class="lg" placeholder="Search" v-model="search" v-on:keyup="searchPokemon"></b-form-input>
    </b-nav-form>
    <b-nav-form>
      <b-form-select
        id="exampleInput3"
        :options="pokemonTypes"
        required
        v-model="selectedType"
        v-on:change="changeType"
      />
    </b-nav-form>
      <div class="tool-bar">
        <b-icon
          font-scale="2"
          icon="list"
          v-on:click="changeValue('list')"
          v-bind:class="{ 'active': getLayout == 'list'}"
        ></b-icon>
        <b-icon
          font-scale="2"
          icon="grid3x2-gap-fill"
          v-on:click="changeValue('grid')"
          v-bind:class="{ 'active': getLayout == 'grid'}"
        ></b-icon>
      </div>
  </b-navbar>
  <!-- </b-container> -->
</template>

<script>
import gql from "graphql-tag";
import { mapActions, mapGetters, mapState } from "vuex";

const GET_TYPES = gql`
  query {
    pokemonTypes
  }
`;

export default {
  name: "nav-bar",
  props: {
    //layout: String,
    // modifyView: Function,
    // searchValue: Function
  },
  data() {
    return {
      search: "",
      pokemonTypes: [],
      selectedType: ""
      // layout: '',
    };
  },
  apollo: {
    pokemonTypes: {
      query: GET_TYPES
    }
  },
  computed: {
    ...mapGetters(["getLayout"])
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
  },
  mounted() {
    console.log(this.layout);
  }
};
</script>
