import {DELAY_IN_MS} from "../../src/constants/delays";
import assert from "assert";
import {circle, circleValue} from "../constnts/constants";

describe("string", () => {
    beforeEach(() => {
        cy.visit("recursion")
    });
    it("if input is empty button is disabled", () => {
        cy.get("input").clear();
        cy.get("button").should('be.disabled')
    })
    it("string is reversing", () => {
        cy.clock()
        cy.get("input").type("yandex")
        cy.get("button").contains("Развернуть").click();

        cy.get(circleValue).as('circleValues').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'yandex', `${text.toLowerCase()} is not equal to 'yandex`)
        })
        cy.get(circle).as('circle').contains('y').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circle').contains('x').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circle').contains('a').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('@circle').contains('n').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('@circle').contains('d').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('@circle').contains('e').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.tick(DELAY_IN_MS)
        cy.get('@circleValues').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'xandey', `${text.toLowerCase()} is not equal to 'xandey`)
        })
        cy.get('@circle').contains('y').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('@circle').contains('x').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('@circle').contains('a').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circle').contains('e').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS)
        cy.get('@circleValues').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'xenday', `${text.toLowerCase()} is not equal to 'xenday`)
        })
        cy.get('@circle').contains('a').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('@circle').contains('e').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('@circle').contains('n').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circle').contains('d').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS)
        cy.get('@circleValues').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'xednay', `${text.toLowerCase()} is not equal to 'xednay`)
        })
        cy.get('@circle').contains('n').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('@circle').contains('d').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
    })
});
