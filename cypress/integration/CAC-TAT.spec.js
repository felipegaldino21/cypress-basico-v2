/// <reference types="Cypress" />
beforeEach(() => {
    cy.visit('./src/index.html'); 
});

describe('Central de Atendimento ao Cliente TAT', () => {
    it('verifica o título da aplicação', () => {
       
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
        
    });

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.fillMandatoryFieldsAndSubmit();
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Felipe', {delay:0});
        cy.get('#lastName').type('Galdino', {delay:0});
        cy.get('#email').type('felipegaldino', {delay:0});
        cy.get('#phone').type('11999999999', {delay:0});
        cy.get('#open-text-area').type('Preciso de suporte', {delay:0});
        cy.contains('.button','Enviar' ).click();
        cy.get('.error').should('be.visible')
    });

    it(' teste para validar que, se um valor não-numérico for digitado, seu valor continuará vazio', () => {
        cy.get('#firstName').type('Felipe', {delay:0});
        cy.get('#lastName').type('Galdino', {delay:0});
        cy.get('#email').type('felipegaldino@email.com.br', {delay:0});
        cy.get('#phone').type('abc', {delay:0}).should('be.empty');
        cy.get('#open-text-area').type('Preciso de suporte', {delay:0});
        cy.get('.button').click();
        cy.get('.success').should('be.visible')
    });
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Felipe', {delay:0});
        cy.get('#lastName').type('Galdino', {delay:0});
        cy.get('#email').type('felipegaldino', {delay:0});
        cy.get('#open-text-area').type('Preciso de suporte', {delay:0});
        cy.get('#phone-checkbox').click();
        cy.contains('.button','Enviar' ).click();
        cy.get('.error').should('be.visible')
    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Felipe', {delay:0}).should('have.value', 'Felipe')
            .clear().should('have.value', '');
        cy.get('#lastName').type('Galdino', {delay:0}).should('have.value', 'Galdino')
            .clear().should('have.value', '');
        cy.get('#email').type('felipegaldino@email.com.br', {delay:0}).should('have.value', 'felipegaldino@email.com.br')
            .clear().should('have.value', '');
        cy.get('#phone').type('11999999999', {delay:0}).should('have.value', '11999999999')
            .clear().should('have.value', '');
        cy.get('#open-text-area').type('Preciso de suporte', {delay:0}).should('have.value', 'Preciso de suporte')
            .clear().should('have.value', '');
    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('.button','Enviar' ).click();
        cy.get('.error').should('be.visible');
    });
   
});

