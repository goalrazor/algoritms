import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import assert from "assert";

describe("stack", () => {
    const prepareStack = () => {
        cy.clock();
        cy.get("input").type('5');
        cy.get("button").contains("Добавить").click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("input").type('20');
        cy.get("button").contains("Добавить").click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("input").type('13');
        cy.get("button").contains("Добавить").click();
        cy.tick(SHORT_DELAY_IN_MS);
    }
    beforeEach(() => {
        cy.visit("http://localhost:3001/stack")
    });
    it("if input is empty button is disabled", () => {
        cy.get("input").clear();
        cy.get("button").should('be.disabled')
    });
    it("adding algorithm is working", () => {
        cy.clock();
        cy.get("input").type('5');
        cy.get("button").contains("Добавить").click();
        cy.get('div [class^=circle_circle]').contains('5').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get("@circle").siblings('div').contains('top')
        cy.get("@circle").siblings('p').contains('0')
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '5', `${text.toLowerCase()} is not equal to '5`)
        })
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get("input").type('20');
        cy.get("button").contains("Добавить").click();
        cy.get('div [class^=circle_circle]').contains('20').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get("@circle").siblings('div').contains('top')
        cy.get("@circle").siblings('p').contains('1')
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '520', `${text.toLowerCase()} is not equal to '520`)
        })
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get("input").type('13');
        cy.get("button").contains("Добавить").click();
        cy.get('div [class^=circle_circle]').contains('13').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get("@circle").siblings('div').contains('top')
        cy.get("@circle").siblings('p').contains('2')
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '52013', `${text.toLowerCase()} is not equal to '52013`)
        })
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    });
    it('deletion of elements', () => {
        prepareStack();

        cy.get("button").contains("Удалить").click();
        cy.get('div [class^=circle_circle]').contains('13').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '520', `${text.toLowerCase()} is not equal to '520`)
        })
        cy.get("button").contains("Удалить").click();
        cy.get('div [class^=circle_circle]').contains('20').parent("div").as('circle')
        cy.get("@circle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('div [class^=circle_circle] > p').then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '5', `${text.toLowerCase()} is not equal to '5`)
        });
    });
    it('clear the stack', () => {
        prepareStack();

        cy.get("button").contains("Очистить").click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('div [class^=circle_circle]').should('not.exist');
    })
});
