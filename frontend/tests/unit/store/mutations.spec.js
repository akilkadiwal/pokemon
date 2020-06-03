import mutations from "@/store/mutations";

test("changeLayout will change layout from grid to list", () => {
  const state = {
    layout: "grid"
  };
  mutations.changeLayout(state, "list");
  expect(state.layout).toBe("list");
});

test("changeType will change type", () => {
  const state = {
    selectedType: ""
  };
  mutations.changeType(state, "water");
  expect(state.selectedType).toBe("water");
});
