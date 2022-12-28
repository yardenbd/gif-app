describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should submit a form", () => {
    localStorage.clear();
    cy.get("#input").type("soccer");
    cy.get("form").submit();
  });
});
