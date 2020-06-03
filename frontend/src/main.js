import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/sass/home.scss";
import "./assets/sass/pokemon.scss";
import "vue-select/src/scss/vue-select.scss";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueApollo);
Vue.use(BootstrapVueIcons);
// Create an http link:

const link = new HttpLink({
  uri: "http://pokemon-app-backend.herokuapp.com/graphql",
  fetch
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache({
    addTypename: true
  })
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount("#app");
