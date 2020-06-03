import actions from "@/store/actions";

describe("test actions", () => {
  it("action called to change layout to list ", async () => {
    const commit = jest.fn();
    const layout = "list";

    actions.setLayout({ commit }, { layout });
    expect(commit).toHaveBeenCalledWith("changeLayout", { layout: "list" });
  });

  it("action called to change setSearchKeyword ", async () => {
    const commit = jest.fn();
    const searchWord = "char";

    actions.setLayout({ commit }, { searchWord });
    expect(commit).toHaveBeenCalledWith("changeLayout", { searchWord: "char" });
  });
});
