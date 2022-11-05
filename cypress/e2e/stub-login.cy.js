/// <reference types="cypress" />

import { data } from "cypress/types/jquery"


context('stub login',() => {
    it('forced return',() => {
        cy.visit('https://cms-lyart.vercel.app/login')
        cy.get('#login_role > :nth-child(3)').click()
        cy.intercept(
            {
            url:'https://cms-lyart.vercel.app/login',
        })
        cy.intercept('POST','/api/Login',{
            statusCode: 500,
            msg: 'server error',
            data: { null

            } // data 是null ？

        })

        /* cy.login("manager@admin.com","111111") // not working,check the command.js 
        const obj = { 
            foo() {}, // foo mean?
        }
        const stub = cy.stub(obj,'foo').log(false) //obj.foo mean?
        expect(data).to.be.null
        expect(status).to.eq(500)
        expect(msg).to.have('server error')  不知道是用intercept还是用stub*/ 

        

    })
})