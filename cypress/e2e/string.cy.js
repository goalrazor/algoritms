import {DELAY_IN_MS} from "../../src/constants/delays";
import assert from "assert";

describe("string", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001/recursion")
    });
    it("if input is empty button is disabled", () => {
        cy.get("input").clear();
        cy.get("button").should('be.disabled')
    })
    it("string is reversing", () => {
        cy.clock()
        cy.get("input").type("yandex")
        cy.get("button").contains("Развернуть").click();

        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'yandex', `${text.toLowerCase()} is not equal to 'yandex`)
        })
        cy.get('div [class^=circle_circle]').contains('y').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('div [class^=circle_circle]').contains('x').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('div [class^=circle_circle]').contains('a').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('div [class^=circle_circle]').contains('n').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('div [class^=circle_circle]').contains('d').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get('div [class^=circle_circle]').contains('e').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.tick(DELAY_IN_MS)
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'xandey', `${text.toLowerCase()} is not equal to 'xandey`)
        })
        cy.get('div [class^=circle_circle]').contains('y').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('div [class^=circle_circle]').contains('x').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('div [class^=circle_circle]').contains('a').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('div [class^=circle_circle]').contains('e').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS)
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'xenday', `${text.toLowerCase()} is not equal to 'xenday`)
        })
        cy.get('div [class^=circle_circle]').contains('a').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('div [class^=circle_circle]').contains('e').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('div [class^=circle_circle]').contains('n').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('div [class^=circle_circle]').contains('d').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS)
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text.toLowerCase() === 'xednay', `${text.toLowerCase()} is not equal to 'xednay`)
        })
        cy.get('div [class^=circle_circle]').contains('n').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.get('div [class^=circle_circle]').contains('d').parent("div").invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
    })
});
