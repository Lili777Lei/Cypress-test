
describe ('test sign in feature',() => {
    beforeEach(()=>{cy.visit('https://cms-lyart.vercel.app/login');
    })

    it('1,three roles are clickable',() => {
        cy.get('#login_role > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked > span:nth-child(2').click();
        cy.get('#login_role > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked > span:nth-child(2)').click();
        cy.get('#login_role > label:nth-child(3) > span:nth-child(2)').click();
    })

    it('2,student role is a defalt value',() => {
        cy.get('#login_role > label.ant-radio-button-wrapper.ant-radio-button-wrapper-checked > span.ant-radio-button.ant-radio-button-checked > input')
          .should('to.be.checked')
    })
    

    it('3,student account login sucessfully',() => {
        cy.get('#login_email').type('student@admin.com');
        cy.get('#login_password').type('111111');
        cy.get('#login > div:nth-child(5) > div > div > div > button').click().then(() => {
            cy.url().visit('https://cms-lyart.vercel.app/dashboard/student');//能跑 但是unknow error 不是获得新的URL
        })
    })

    it('4,student account login with invalid email',() => {
        cy.get('#login_email').type('stud1@$ent');
        cy.get('#login_password').type('111111');
        cy.get('#login > div:nth-child(5) > div > div > div > button')
          .click();
        cy.get('div.ant-message');
        expect('eq','please check your password or email');//有时候能跑 有时候不能跑。。
    })

    
    
    it('5,student account login with invalid password',() =>{
        cy.get('#login_email').type('student@admin.com');
        cy.get('#login_password').type('112233');
        cy.get('#login > div:nth-child(5) > div > div > div > button')
          .click();
        cy.get('div.ant-message');
        expect('eq','please check your password or email');// 同上
    })
        


describe('test sign up feature',() => {
    beforeEach(()=>{cy.visit('https://cms-lyart.vercel.app/signup');
    })

    it('1, there are three options clickable of the roles ',() => {
        cy.get('#signUp_role').should('be.visible');
        cy.get(':nth-child(1) > .ant-radio > .ant-radio-input').click();
        cy.get(':nth-child(2) > .ant-radio > .ant-radio-input').click();
        cy.get(':nth-child(3) > .ant-radio > .ant-radio-input').click();
    })

    it('2, student account sign up sucessfully',() => {
        cy.get(':nth-child(1) > .ant-radio > .ant-radio-input').click();
        cy.get('#signUp_email').type('student@admin.com');
        cy.get('#signUp_password').type('111111');
        cy.get('#signUp_confirmPassword').type('111111');
        cy.get('#signUp > div:nth-child(5) > div > div > div > button').click().then(() => {
            cy.url().should('eq','https://cms-lyart.vercel.app/login');
        })
        //不能跑 unknown error 我觉得是因为不能访问url
    })

    it('3, layout sider become wider after clicking headericon',() => {
        cy.visit('https://cms-lyart.vercel.app/dashboard/student');
        cy.get('#contentLayout > header > span > span > svg').click;
        expect('#__next > section > aside','width').to.eq('80px');
    }) // 同上


})

})
