import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import assert from "assert";

describe("fibonacci", () => {
    beforeEach(() => {
        cy.visit("fibonacci")
    });
    it("if input is empty button is disabled", () => {
        cy.get("input").clear();
        cy.get("button").should('be.disabled')
    });
    it("fibonacci algorithm is working", () => {
        cy.clock()
        cy.get("input").type('5')
        cy.get("button").contains("Рассчитать").click();
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '0', `${text.toLowerCase()} is not equal to '0`)
        })
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '01', `${text.toLowerCase()} is not equal to '01`)
        })
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '011', `${text.toLowerCase()} is not equal to '011`)
        })
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '0112', `${text.toLowerCase()} is not equal to '0112`)
        })
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '01123', `${text.toLowerCase()} is not equal to '01123`)
        })
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === '011235', `${text.toLowerCase()} is not equal to '011235`)
        })
    })
})
