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
        cy.get('#phone-checkbox').check().should('be.checked');
        cy.contains('.button','Enviar' ).click();
        cy.get('.error').should('be.visible')
    });
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Felipe', {delay:0})
            .should('have.value', 'Felipe')
            .clear().should('have.value', '');
        cy.get('#lastName').type('Galdino', {delay:0})
            .should('have.value', 'Galdino')
            .clear().should('have.value', '');
        cy.get('#email').type('felipegaldino@email.com.br', {delay:0})
            .should('have.value', 'felipegaldino@email.com.br')
            .clear().should('have.value', '');
        cy.get('#phone').type('11999999999', {delay:0})
            .should('have.value', '11999999999')
            .clear().should('have.value', '');
        cy.get('#open-text-area').type('Preciso de suporte', {delay:0})
            .should('have.value', 'Preciso de suporte')
            .clear().should('have.value', '');
    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('.button','Enviar' ).click();
        cy.get('.error').should('be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('youtube')
            .should('have.value' , 'youtube');
    });

    it('seleciona um produto (Mentoria) por seu texto', () => {
        cy.get('#product').select('mentoria')
            .should('have.value' , 'mentoria');
    });

    it('seleciona um produto (Blog) por seu texto', () => {
        cy.get('#product')
            .select(1)
            .should('have.value' , 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value' , 'feedback');
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($radio)=>{
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json' , {action: 'drag-drop'})
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
            
    });
   
});

