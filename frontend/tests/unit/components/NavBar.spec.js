import Vuex from "vuex";
import vSelect from "vue-select";
import NavBar from "@/components/NavBar.vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import { BootstrapVue, BootstrapVueIcons, BFormInput } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

// install plugins as normal
localVue.use(BootstrapVue);
localVue.use(BootstrapVueIcons);
localVue.use(Vuex);

describe("HelloWorld.vue", () => {
  const wrapper = shallowMount(NavBar, {
    mocks: {
      $store: {
        getters: {
          getSearchKeyword: "xyz",
          getType: "grass",
          getLayout: "list"
        }
      },
      $apollo: {
        query: jest.fn(() => Promise.resolve({ data: {} }))
      }
    },
    localVue
  });

  it("renders childrens", () => {
    expect(wrapper.find(BFormInput).exists()).toBe(true);
  });

  it("renders childrens", () => {
    expect(wrapper.find(vSelect).exists()).toBe(true);
  });
});
