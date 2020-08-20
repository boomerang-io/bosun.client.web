import { buildVisitUrl } from "../utils";
import { startApiServer } from "ApiServer";
import { appLink } from "Config/appConfig";

let server;

describe("Create Policy", function () {
  beforeEach(() => {
    server = startApiServer({ environment: "test" });
    cy.visit(buildVisitUrl(appLink.createPolicy({teamId:"5a8b331e262a70306622df73"})));
  });

  afterEach(() => {
    server.shutdown();
  });

  it("Create Policy", function () {
    cy.url().should("include", "/policy/create");
    cy.contains(/Create Policy/i).should("exist");
    cy.findByRole("button", {name: "Create"}).should("be.disabled");
    cy.findByLabelText("Name").type("Cypress Policy");

    cy.findByRole("button", {name: "Create"}).should("be.enabled").click();
    
    cy.contains(/Policy Created/i).should("exist");
    cy.url().should("not.include", "/policy/create");
    cy.contains(/Cypress Policy/i).should("exist");
  });

  it("Back to Policy Overview", function () {
    cy.url().should("include", "/policy/create");
    cy.findByRole("button", {name: "Cancel"}).click();

    cy.url().should("not.include", "/policy/create");
  });
});
