import { createVerify } from "crypto";

describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("should submit a form", () => {
    localStorage.clear();
    cy.get("#input").type("soccer");
    cy.get("form").submit();
    cy.get("#date").type("2018-12-12");
    cy.get("#date").invoke("val").should("equal", "2018-12-12");
    cy.get("#gifs").eq(0).children("img").should("have.attr", "src");
  });
});
