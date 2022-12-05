import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import assert from "assert";
import {circle, circleSmall} from "../constnts/constants";

describe("list", () => {
    beforeEach(() => {
        cy.visit("list")
    });
    it("if input is empty button is disabled", () => {
        cy.get("input").clear();
        cy.get("button").contains('Добавить в head').parent().should('be.disabled')
        cy.get("button").contains('Добавить в tail').parent().should('be.disabled')
        cy.get("button").contains('Удалить по индексу').parent().should('be.disabled')
        cy.get("button").contains('Добавить по индексу').parent().should('be.disabled')
    });

    it('default list is rendered ', () => {
        cy.get(circle).as('circles');
        cy.get('@circles').first().siblings('div').contains('head')
        cy.get('@circles').first().siblings('p').contains('0')
        cy.get('@circles').last().siblings('div').contains('tail')
    });
    it('should add element in head', () => {
        cy.clock();
        cy.get("input").first().type('12');
        cy.get("button").contains('Добавить в head').click();
        cy.get(circleSmall).as('smallCircle')
        cy.get('@smallCircle').contains('12').parent().parent().parent().parent().contains('0')
        cy.get("@smallCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get(circle).as('circles').siblings('p').contains('0').parent().children(circle).siblings("div").should("not.contain", /head/)
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circles").contains('12').parent('div').siblings('div').contains('head');
        cy.get("@circles").contains('12').parent('div').siblings('p').contains('0');
        cy.get("@circles").contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@circles").contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    })
    it('should add element in tail', () => {
        cy.clock();
        cy.get("input").first().type('12');
        cy.get("button").contains('Добавить в tail').click();
        cy.get(circleSmall).as('smallCircle');
        cy.get(circle).as('circles');
        cy.get('@smallCircle').contains('12')
        cy.get("@smallCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS);
        let countOfElements = 0;
        cy.get(circle).as('countedCircles').then(elements => {
            countOfElements = elements.length;
        }).then(() => cy.get("@countedCircles").contains('12').parent('div').siblings('p').contains(`${countOfElements - 1}`));
        cy.get("@countedCircles").contains('12').parent('div').siblings('div').contains('tail');
        cy.get("@countedCircles").contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get("@countedCircles").contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    });
    it("should add element by index", () => {
        cy.clock();
        cy.get("input").first().type('12');
        cy.get("input").last().type('1');
        cy.get("button").contains('Добавить по индексу').click();
        cy.get(circleSmall).as('smallCircle');
        cy.get(circle).as('circles');
        cy.get('@smallCircle').contains('12').parent().parent().parent().parent().children('div').last().children('p').contains('0')
        cy.get("@smallCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS);
        cy.get('@circles').siblings('p').contains('0').parent().children(circle).siblings("div").should("not.contain", /head/)
        cy.tick(DELAY_IN_MS);
        cy.get('@smallCircle').contains('12').parent().parent().parent().parent().children('div').last().children('p').contains('1')
        cy.get('@circles').siblings('p').contains('0').parent().children(circle).siblings("div").contains('head')
        cy.tick(DELAY_IN_MS);
        cy.get('@circles').first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.get('@circles').contains('12').parent().siblings('p').contains('1')
        cy.get('@circles').contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_modified'))
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').contains('12').parent().invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    });
    it('should delete element from head', () => {
        cy.clock();
        cy.get("button").contains('Удалить из head').click();
        cy.get(circle).as('circles');
        cy.get(circleSmall).as('smallCircle')
        let text = ''
        cy.get('@smallCircle').find('p').first().then(element => text = element.text()).then(() => cy.get('@smallCircle').contains(`${text}`).parent().parent().parent().parent().contains('0'))
        cy.get("@smallCircle").invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS);
        cy.get('@circles').siblings('p').contains('0').parent().children(circle).siblings("div").should("not.contain", /tail/)
        cy.tick(DELAY_IN_MS);
        cy.get('@circles').invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get("@circles").first().siblings('div').contains('head');
        cy.get("@circles").first().siblings('p').contains('0');
    });
    it('should delete element from tail', () => {
        cy.clock();
        cy.get("button").contains('Удалить из tail').click();
        cy.get(circleSmall).as('smallCircle');
        let text = '';
        let countOfElements = 0;
        cy.get('@smallCircle').find('p')
            .first().then(element => text = element.text()).then(() => cy.get('@smallCircle')
            .contains(`${text}`).parent().parent().parent().parent().as('index'));
        cy.get('div [class*=circle_default]').as('defaultCircle').then(elements => {
            countOfElements = elements.length;
        }).then(() => cy.get('@index').find('p').contains(countOfElements - 1));
        cy.tick(DELAY_IN_MS);
        cy.tick(DELAY_IN_MS);
        cy.get('@defaultCircle').invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
        cy.get("@defaultCircle").first().siblings('div').contains('head');
        cy.get("@defaultCircle").last().siblings('div').contains('tail');
    });
    it("should delete item from index", () => {
        cy.clock();
        cy.get("input").last().type('1');
        cy.get("button").contains('Удалить по индексу').click();
        cy.get(circle).as('circles');
        cy.get('@circles').first().invoke('attr', 'class').then(classList => expect(classList).contains('circle_changing'))
        cy.tick(DELAY_IN_MS);
        cy.get(circleSmall).as('smallCircle');
        cy.get('@smallCircle').parent().parent().parent().children('div').last().children('p').contains('1')
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get('@circles').invoke('attr', 'class').then(classList => expect(classList).contains('circle_default'))
    })
});
