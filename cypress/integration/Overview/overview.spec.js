import { buildVisitUrl } from "../utils";
import { startApiServer } from "ApiServer";

let server;

describe("Policies Overview", function () {
  beforeEach(() => {
    server = startApiServer({ environment: "test" });
    cy.visit(buildVisitUrl());
  });

  afterEach(() => {
    server.shutdown();
  });

  it("Render basic overview page", function () {
    cy.findByRole("button", {name: "Create Policy"});
    cy.contains(/Violations Trend/i).should("exist");
    cy.contains(/Current Gates/i).should("exist");
    cy.contains(/Current Violations/i).should("exist");
    cy.findByRole("button", {name: "Create Policy"});
    cy.contains("All of your teams policies can be found here").should("exist");
  });

  it("Redirect to Create Policy", function () {
    cy.contains("All of your teams policies can be found here").should("exist");
    cy.findByRole("button", {name: "Create Policy"}).click();
    cy.url().should("include", "create");
    cy.contains("Create Policy").should("exist");
  });

  it("Redirect to Edit Policy", function () {
    cy.contains("All of your teams policies can be found here").should("exist");
    const policiesTableRows = cy.findAllByTestId("policies-table-row");
    policiesTableRows.should("have.length.of.at.least", 1);
    policiesTableRows.first().click();
    cy.url().should("include", "edit");
    cy.contains("Edit Policy").should("exist");
    cy.findByRole("button", {name: "Cancel"}).should("exist");
    cy.findByRole("button", {name: "Delete"}).should("exist");
    cy.findByRole("button", {name: "Save"}).should("exist");
  });

  it("Violation Detail", function () {
    cy.contains(/Compliance is logged for the latest version of a component in a specific stage per policy/i).should("exist");
    const violationsTableRows = cy.findAllByTestId("violations-table-row");
    violationsTableRows.should("have.length.of.at.least", 1);
    violationsTableRows.first().click();
    cy.contains(/Failed Definition Types/i).should("exist");
    cy.contains(/Reference Link/i).should("exist");
    cy.contains(/Created Date/i).should("exist");

    cy.findByTestId("close-violation-detail").click();

    cy.findByTestId("close-violation-detail").should("not.be.visible");
  });
});
