describe("Compléter une tâche", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("#username").type("admin");
    cy.get("#password").type("1234");
    cy.get("form").submit();
    cy.url().should("include", "/dashboard");

    // Créer une tâche à cocher
    cy.get("#task-input").type("Tâche à compléter");
    cy.contains("Ajouter").click();
  });

  it("change le statut d’une tâche", () => {
    // Coche la tâche
    cy.contains("Tâche à compléter")
      .parent()
      .find("button")
      .contains("✔")
      //.contains("Terminé")
      .click();

    // Vérifie que la tâche est barrée (classe "completed")
    cy.contains("Tâche à compléter")
      .parents(".task")
      .should("have.class", "completed");
  });
});
