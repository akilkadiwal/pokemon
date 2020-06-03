<template>
  <div class="home">
    <section class="grid-list" v-cloak>
      <b-card no-body>
        <b-tabs pills align="center">
          <b-tab title="All" active lazy>
            <b-card-text>
              <NavBar />
              <All />
            </b-card-text>
          </b-tab>
          <b-tab title="Favorites" lazy>
            <b-card-text>
              <NavBar />
              <Favorite />
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import All from "./All.vue";
import NavBar from "@/components/NavBar.vue";
import Favorite from "./Favorite.vue";

export default {
  name: "home",
  components: {
    All,
    NavBar,
    Favorite
  }
};
</script>
