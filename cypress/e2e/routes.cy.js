describe("routing", () => {
    beforeEach(() => {
        cy.visit('')
    })
    it("open main page", () => {
        cy.contains("МБОУ АЛГОСОШ")
    })
    it("open string page", () => {
        cy.get("a[href*='/recursion']").click()
        cy.contains("Строка")
    })
    it("open fibonacci page", () => {
        cy.get("a[href*='/fibonacci']").click()
        cy.contains("Фибоначчи")
    })
    it("open sorting page", () => {
        cy.get("a[href*='/sorting']").click()
        cy.contains("Сортировка")
    })
    it("open sorting page", () => {
        cy.get("a[href*='/sorting']").click()
        cy.contains("Сортировка массива")
    })
    it("open stack page", () => {
        cy.get("a[href*='/stack']").click()
        cy.contains("Стек")
    })
    it("open queue page", () => {
        cy.get("a[href*='/queue']").click()
        cy.contains("Очередь")
    })
    it("open list page", () => {
        cy.get("a[href*='/list']").click()
        cy.contains("Связный список")
    })
})
