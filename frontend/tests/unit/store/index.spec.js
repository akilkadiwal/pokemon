import storeConfig from "@/store/index";

test("get state property", () => {
  expect(storeConfig.state.layout).toBe("grid");
});

test("test getters", () => {
  expect(storeConfig.getters.getType).toBe("");
});
