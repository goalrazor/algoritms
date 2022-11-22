import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import assert from "assert";

describe("list", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3001/list")
    });
    it("if input is empty button is disabled", () => {
        cy.get("input").clear();
        cy.get("button").contains('Добавить в head').parent().should('be.disabled')
        cy.get("button").contains('Добавить в tail').parent().should('be.disabled')
        cy.get("button").contains('Удалить по индексу').parent().should('be.disabled')
        cy.get("button").contains('Добавить по индексу').parent().should('be.disabled')
    });
    it('default list is rendered ', () => {
        cy.get('div [class*=circle_circle]').as('circles');
        cy.get('@circles').first().siblings('div').contains('head')
        cy.get('@circles').first().siblings('p').contains('0')
        cy.get('@circles').last().siblings('div').contains('tail')
    });
    it('should add element in head', () => {
        cy.clock();
        cy.get("input").first().type('12');
        cy.get("button").contains('Добавить в head').click();
        cy.get('div [class*=circle_small]').as('smallCircle')
        cy.get('@smallCircle').contains('12').parent().parent().parent().parent().contains('0')
        cy.get("@smallCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('div [class^=circle_circle]').as('circle').siblings('p').contains('0').parent().children('div [class^=circle_circle]').siblings("div").should("not.contain", /head/)
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circle").contains('12').parent('div').siblings('div').contains('head');
        cy.get("@circle").contains('12').parent('div').siblings('p').contains('0');
        cy.get("@circle").contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circle").contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    })
    it('should add element in tail', () => {
        cy.clock();
        cy.get("input").first().type('12');
        cy.get("button").contains('Добавить в tail').click();
        cy.get('div [class*=circle_small]').as('smallCircle')
        cy.get('@smallCircle').contains('12')
        cy.get('div [class^=circle_circle]').as('circle')
        cy.get("@smallCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS);
        let countOfElements = 0;
        cy.get('div [class^=circle_circle]').as('circle').then(elements => {
            countOfElements = elements.length;
        }).then(() => cy.get("@circle").contains('12').parent('div').siblings('p').contains(`${countOfElements - 1}`));
        cy.get("@circle").contains('12').parent('div').siblings('div').contains('tail');
        cy.get("@circle").contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circle").contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    });
    it("should add element by index", () => {
        cy.clock();
        cy.get("input").first().type('12');
        cy.get("input").last().type('1');
        cy.get("button").contains('Добавить по индексу').click();
        cy.get('div [class*=circle_small]').as('smallCircle')
        cy.get('@smallCircle').contains('12').parent().parent().parent().parent().children('div').last().children('p').contains('0')
        cy.get("@smallCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS);
        cy.get('div [class^=circle_circle]').as('circle').siblings('p').contains('0').parent().children('div [class^=circle_circle]').siblings("div").should("not.contain", /head/)
        cy.tick(DELAY_IN_MS);
        cy.get('@smallCircle').contains('12').parent().parent().parent().parent().children('div').last().children('p').contains('1')
        cy.get('div [class^=circle_circle]').as('circle').siblings('p').contains('0').parent().children('div [class^=circle_circle]').siblings("div").contains('head')
        cy.tick(DELAY_IN_MS);
        cy.get('@circle').first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circle').contains('12').parent().siblings('p').contains('1')
        cy.get('@circle').contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle').contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    });
    it('should delete element from head', () => {
        cy.clock();
        cy.get("button").contains('Удалить из head').click();
        let text = ''
        cy.get('div [class*=circle_small]').as('smallCircle').find('p').first().then(element => text = element.text()).then(() => cy.get('@smallCircle').contains(`${text}`).parent().parent().parent().parent().contains('0'))
        cy.get("@smallCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS);
        cy.get('div [class^=circle_circle]').as('circle').siblings('p').contains('0').parent().children('div [class^=circle_circle]').siblings("div").should("not.contain", /tail/)
        cy.tick(DELAY_IN_MS);
        cy.get('@circle').invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get("@circle").first().siblings('div').contains('head');
        cy.get("@circle").first().siblings('p').contains('0');
    });
    it('should delete element from tail', () => {
        cy.clock();
        cy.get("button").contains('Удалить из tail').click();
        let text = '';
        let countOfElements = 0;
        cy.get('div [class*=circle_small]').as('smallCircle').find('p')
            .first().then(element => text = element.text()).then(() => cy.get('@smallCircle')
            .contains(`${text}`).parent().parent().parent().parent().as('index'));
        cy.get('div [class*=circle_default]').as('circle').then(elements => {
            countOfElements = elements.length;
        }).then(() => cy.get('@index').find('p').contains(countOfElements - 1));
        cy.tick(DELAY_IN_MS);
        cy.tick(DELAY_IN_MS);
        cy.get('@circle').invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get("@circle").first().siblings('div').contains('head');
        cy.get("@circle").last().siblings('div').contains('tail');
    });
    it("should delete item from index", () => {
        cy.clock();
        cy.get("input").last().type('1');
        cy.get("button").contains('Удалить по индексу').click();
        cy.get('div [class^=circle_circle]').as('circle').first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS);
        cy.get('div [class*=circle_small]').as('smallCircle')
        cy.get('@smallCircle').parent().parent().parent().children('div').last().children('p').contains('1')
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circle').invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    })
});
