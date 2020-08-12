import { buildVisitUrl } from "../utils";
import { startApiServer } from "ApiServer";
import { appLink } from "Config/appConfig";

let server;

describe("Edit Policy", function () {
  beforeEach(() => {
    server = startApiServer({ environment: "test" });
    cy.visit(buildVisitUrl(appLink.editPolicy({teamId:"5a8b331e262a70306622df73", policyId: "XIkcXao"})));
  });

  afterEach(() => {
    server.shutdown();
  });

  it("Edit Policy", function () {
    cy.url().should("include", "/policy/edit");
    cy.contains(/Edit Policy/i).should("exist");

    cy.findByLabelText("Name").clear();

    cy.findByRole("button", {name: "Save"}).should("be.disabled");
    cy.findByLabelText("Name").type("New Cypress Policy");
    cy.findByRole("button", {name: "Save"}).should("be.enabled").click();
    
    cy.contains(/Policy Updated/i).should("exist");
    cy.url().should("not.include", "/policy/edit");
    cy.contains(/New Cypress Policy/i).should("exist");
    cy.contains(/New Policy/i).should("not.exist");
  });

  it("Delete Policy", function () {
    cy.url().should("include", "/policy/edit");
    cy.findByRole("button", {name: "Delete"}).click();
    cy.findByRole("button", {name: "Yes"}).click();

    cy.contains(/Policy Deleted/i).should("exist");
    cy.url().should("not.include", "/policy/edit");
    cy.contains(/New Policy successfully deleted/i).should("exist");
  });

  it("Back to Policy Overview", function () {
    cy.url().should("include", "/policy/edit");
    cy.findByRole("button", {name: "Cancel"}).click();

    cy.url().should("not.include", "/policy/edit");
  });
});
