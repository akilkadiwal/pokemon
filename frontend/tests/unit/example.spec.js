import Vuex from "vuex";
import Home from "@/views/Home.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

// install plugins as normal
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("HelloWorld.vue", () => {
  let getters;
  let store;

  beforeEach(() => {
    getters = {
      clicks: () => 2,
      getType: () => "list"
    };

    store = new Vuex.Store({
      getters
    });
  });
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(Home, { store, localVue });
    expect(wrapper.find(".grid-list").exists()).toBe(true);
  });
});
