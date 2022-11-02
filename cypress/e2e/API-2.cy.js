/// <reference types="cypress" />


describe('UserRole API',() => {
    
    context('GET / userRole',() => {
        it('search function', () => { 
            const token = Cypress.env().managerToken; //env的意思？
            const authorization = `bearer ${token}`; //token写法 死记
            const options = {
                method: 'GET',
                url: `${Cypress.env().prod}/api/userRole`,
                headers: {
                    authorization
                }
            }
            cy.request(options).then((res) => {  //为什么用then？
                const data = res.body.data; //省事
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property('data','manager');
                expect(res.body).to.have.property('msg','success');
        

            })
        })
    })

    context('POST / userRole',() => {
        it('login function', () => {
            /*const token = Cypress.env().managerToken; // unsure if need it? prefer no need
            const authorization = `bearer ${token}`; // unsure if need it? prefer no need
                                                     // 为什么没有用到Heather上？ content-type=json？*/
            const options = {
                method: 'POST',
                url: `${Cypress.env().prod}/api/login`,
                body: {
                    email: "manager@admin.com",
                    password: "U2FsdGVkX1/7deKzXWsC8AJrDedAXWUvHkDcRcPY24w=",
                    role: "manager"

                }
            }
            cy.request(options).then((res) => {  //觉得思路对 但是一写就报错 是不会格式？
                const data = res.body.data;   //数据结构很重要 data在body下面 body在res下面
                expect(res.status).to.eq(201);
                expect(data).have.property('token').exist;
                expect(data).have.property('role','manager');
                expect(res.body).have.property('msg','success'); //数据结构 msg属于body不属于data
                
            })
            
        })
    })

})