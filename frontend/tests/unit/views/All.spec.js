import Vuex from "vuex";
import Grid from "@/components/Grid.vue";
import All from "@/views/All.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

// install plugins as normal
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("HelloWorld.vue", () => {
  const wrapper = shallowMount(All, {
    mocks: {
      $store: {
        getters: {
          getSearchKeyword: "xyz",
          getType: "grass",
          getLayout: "list",
          getPokemons: ["pikachu"]
        }
      },
      $apollo: {
        query: jest.fn(() => Promise.resolve({ data: {} }))
      }
    },
    localVue
  });

  it("renders childrens", () => {
    expect(wrapper.findAll(Grid).length).toBe(1);
  });

  it("Check  props and childcomponents props value ", () => {
    const defaultData = All.data();
    expect(defaultData.offset).toBe(0);
    const ChildComponent = wrapper.find(Grid).props();
    expect(ChildComponent.getLayout).toBe("list");
    expect(ChildComponent.getPokemons).toEqual(["pikachu"]);
  });
});
