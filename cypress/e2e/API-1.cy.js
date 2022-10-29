/// <reference types="cypress" />

describe('Course API',() =>{
    context('GET /courses', () =>{
        const token = Cypress.env().managerToken;
        const authorization = 'bearer ${token}';
        const options = {
            method: 'GET',
            url: '${Cypress.env().prod}/api/courses?page=1&limit=5',
            headers: {
                authorization,
            },
        }
        cy.request(options).then((res) => {
            const data = res.body.data;
            expect(res.status).to.eq(200);
            expect(Array.isArray(data.courses)).to.be.true;
            expect(data.course.length).to.eq(5);
            expect(typeof data.total).eq('number');
            expect(data.paginator).exist;
        })
    })
})

    context('GET /course/detail',() => {
        const token = Cypress.env().managerToken;
        const authorization = 'bearer ${token}';
        const option = {
            method: 'GET',
            url: '${Cypress.env().prod}/courses/detail?id=3',
            headers: {
                authorization,
            }
        }
        it('get a course with detail', () => {
            cy.request(options).then((res) => {
                const data = res.body.data;
                expect(res.status).to.eq(200);
                expect(data.id).to.eq(3);
            })
        })
    })