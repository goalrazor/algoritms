import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import assert from "assert";
import {circle, circleValue} from "../constnts/constants";

describe("queue", () => {
    const prepareQueue = () => {
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
        cy.visit("queue")
    });
    it("if input is empty button is disabled", () => {
        cy.get("input").clear();
        cy.get("button").should('be.disabled')
    });
    it("adding algorithm working", () => {
        cy.clock();
        cy.get("input").type('5');
        cy.get("button").contains("Добавить").click();
        cy.get(circle).as('circle')
        cy.get("@circle").first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circle").siblings('div').contains('head')
        cy.get("@circle").siblings('div').contains('tail')
        cy.get("@circle").siblings('p').contains('0')
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circle").contains('5')
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '5', `${text.toLowerCase()} is not equal to '5`)
        })

        cy.get("input").type('20');
        cy.get("button").contains("Добавить").click();
        cy.get('@circle').contains('5').as('circleValue').parent('div').siblings('div').contains('head');
        cy.get('@circle').siblings('p').contains('1').parent().children(circle)
            .invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle').contains('20');
        cy.get('@circle').siblings('div').contains('tail');
        cy.get("@circle").siblings('p').contains('1')
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '520', `${text.toLowerCase()} is not equal to '520`)
        });
    });
    it ('deletion of elements', () => {
        prepareQueue();

        cy.get("button").contains("Удалить").click();
        cy.get(circle).as('circle').contains('5').parent("div").as('currentCircle')
        cy.get("@currentCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle').contains('20').parent("div").as('currentCircle')
        cy.get('@currentCircle').siblings('div').contains('head');
        cy.get('@circle').contains('13').parent("div").as('currentCircle')
        cy.get('@currentCircle').siblings('div').contains('tail');
        cy.get(circleValue).then(item=> {
            const text = Array.from(item, el => el.innerText).join("");
            assert(text === '2013', `${text.toLowerCase()} is not equal to '2013`)
        });
    });
    it ('clearing the queue', () => {
        prepareQueue();

        cy.get("button").contains("Очистить").click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(circle).as('circle').contains('5').should('not.exist');
        cy.get('@circle').contains('20').should('not.exist');
        cy.get('@circle').contains('13').should('not.exist');
    })
});
