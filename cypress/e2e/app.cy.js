describe("Сервис загружен", () => {
    it("Доступен по localhost", () => {
        cy.visit('http://localhost:3001/')
    })
})
