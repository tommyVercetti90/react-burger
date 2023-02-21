import {testURL} from '../../src/services/constants'
import {email, password} from '../../src/utils/auth-test-data'
import { ingredientCard,dragDestination } from '../../src/services/constants';
describe('make order', function() {
    before(() => {
      cy.visit(testURL);
      cy.viewport(1474, 762);
    });

    it("should drag ingredients", () => {
        cy.visit(`${testURL}login`)
        cy.get("[type=email]").type(email)
        cy.get("[type=password]").type(password)
        cy.get("button").click()

        cy.get(`[data-testid=${ingredientCard}]`).first().trigger("dragstart").trigger("dragleave");
        cy.get(`[data-testid=${dragDestination}]`).trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        .trigger("dragend")

        cy.get(`[data-testid=${ingredientCard}]`).eq(3).trigger("dragstart").trigger("dragleave");
        cy.get(`[data-testid=${dragDestination}]`).trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        .trigger("dragend")

        cy.get("button").click()

        cy.wait(16000)
        cy.get("[data-testid=modal]").children().last().click()
    })
}); 

describe('ingredient modal', function() {
    before(() => {
      cy.visit(testURL);
      cy.viewport(1474, 762)
    });

    it("should open and close ingredient modal", () => {
        cy.get(`[data-testid=${ingredientCard}]`).first().click();
        cy.get("[data-testid=modal]").children().last().click()
    })
}); 