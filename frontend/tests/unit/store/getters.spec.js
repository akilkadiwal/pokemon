import getters from "@/store/getters";

test("getLayout returns current layout: grid or list ", () => {
  const state = {
    layout: "list"
  };
  expect(getters.getLayout(state)).toBe("list");
});

test("getType returns type of pokemon", () => {
  const state = {
    selectedType: "fire"
  };
  expect(getters.getType(state)).toBe("fire");
});

test("getPokemons returns list of pokemon", () => {
  const state = {
    pokemons: [{ id: 1, name: "Ivysaur" }, { id: 2, name: "pikachu" }]
  };
  expect(getters.getPokemons(state)).toEqual([
    { id: 1, name: "Ivysaur" },
    { id: 2, name: "pikachu" }
  ]);
});

test("getFavoritePokemons returns favorite of pokemon", () => {
  const state = {
    favoritePokemons: [{ id: 3, name: "Charmander" }]
  };
  expect(getters.getFavoritePokemons(state)).toEqual([
    { id: 3, name: "Charmander" }
  ]);
});
