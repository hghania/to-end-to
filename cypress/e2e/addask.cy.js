describe("add-task flow spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get("#username").type("admin");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.url().should("include", "/dashboard");
  });

  it("Ajouter une tâche", () => {
    cy.get("#task-input").type("test fonctionnel");
    cy.contains("Ajouter").click();
    cy.get("#task-list").should("contain", "test fonctionnel");
  });
});
