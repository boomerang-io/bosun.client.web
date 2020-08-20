import { buildVisitUrl } from "../utils";
import { startApiServer } from "ApiServer";
import { appLink } from "Config/appConfig";

let server;

describe("Policy Templates", function () {
  beforeEach(() => {
    server = startApiServer({ environment: "test" });
    cy.visit(buildVisitUrl(appLink.policyTemplates()));
  });

  afterEach(() => {
    server.shutdown();
  });

  it("Templates Table", function () {
    cy.url().should("include", "/templates");
    cy.findByRole("button", {name: "Create Template"}).should("exist");
    cy.contains(/Policy Templates/i).should("exist");
    cy.contains(/Name/).should("exist");
    cy.contains(/Description/).should("exist");
    cy.contains(/Created Date/).should("exist");
    cy.contains(/Key/).should("exist");

    cy.findAllByTestId("templates-table-row").should("have.length.of.at.least", 1);
  });

  it("Create Template", function () {
    cy.findByRole("button", {name: "Create Template"}).click();
    cy.url().should("include", "/templates/create");

    cy.contains(/Create Template/i).should("exist");

    cy.findByLabelText("Name").type("Cypress Template");
    cy.findByLabelText("Key").type("test.key");

    cy.findByRole("tab", {name: "Rules"}).click();
    cy.findByRole("button", {name: "Add Create a new rule"}).click();
    cy.findAllByLabelText("Name").last().type("Test rule");
    cy.findByPlaceholderText("key.value").last().type("test.rule");
    cy.findByTestId("inputs-modal-confirm-button").click();

    cy.findByRole("tab", {name: "OPA Rego"}).click();
    cy.get(".CodeMirror-lines").click({force:true}).type('{t}{e}{s}{t}');

    cy.findByRole("button", {name: "Create"}).click();
    
    cy.contains(/Template Created/i).should("exist");
    cy.url().should("not.include", "/templates/create");
    cy.contains(/Cypress Template/i).should("exist");
  });

  it("Edit Template", function () {
    cy.findAllByTestId("templates-table-row").should("have.length.of.at.least", 1)
      .last()
      .click();

    cy.url().should("include", "/templates/edit");

    cy.contains(/Edit Template/i).should("exist");

    cy.findByLabelText("Name").clear().type("New Cypress Template");
    cy.findByRole("button", {name: "Save"}).click();
    
    cy.contains(/Template Updated/i).should("exist");
    cy.url().should("not.include", "/templates/edit");
    cy.contains(/New Cypress Template/i).should("exist");
  });
});
