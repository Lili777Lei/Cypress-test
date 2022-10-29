/// <reference types ="cypress" />

describe('form test of add course',() =>{

    it('1,manager account can sign in successfully',() => {
        cy.visit('http://cms-lyart.vercel.app/login').get('#login_role > :nth-child(3)').click();
        cy.get('#login_email').type('manager@admin.com');
        cy.get('#login_password').type('111111');
        cy.get('.ant-btn').click().then(() =>{ 
            cy.url().should('eq',Cypress.config().baseUrl + '/dashboard/manager');
        }) 
    })

    it('2,add-course page can display via clicking the button of add course',() => {
        //直接用上一个跳转页面url
       cy.get(':nth-child(4) > .ant-menu-submenu-title').click()
    //      .then(() =>{
    //     cy.get('#Course_3\$Menu').should('have.length', 3);// selector找不到
    //    })
        cy.get('[title="Add Course"] > :nth-child(2) > a').click().then(() => {
            cy.url().should('eq',Cypress.config().baseUrl + '/dashboard/manager/courses/add-course');
        });
    })

    it('3, can create a course successfully',() => {
        cy.get('#name.ant-input').focus() //没有focus 下面的type就不跑
            .type('Stacy Hickle')//input course name 有时候能跑有时候不能跑
        cy.get('#teacherId')// select teacher name //不能get #teacherID//
            .should('have.value','Select teacher')
            .select('Antwan Ernser'); 
        cy.get('.ant-select ant-select-multiple ant-select-show-search')// 不能get #type (select type)
            .select(['PHP','Groovy','Perl']) //multiple 提醒是多选
            .invoke('val')// 引用val功能抓值
            .should('eq',['PHP','Groovy','Perl']);
        cy.get('input[placeholder="Select date"]#startTime').click().then(() => { // Start date 为什么then一下？
            const title = format(addDays(new Date(),2),'yyyy-mm-dd');// const+ library❗️
            cy.get('td[title=${title}]').click(); // date fn get today❗️
        })

        cy.get('#price').type('320'); // input price
        cy.get('#maxStudents').type('9'); // input student limit

        cy.get('.ant-input-number').type('3') // select duration 
            .get('.ant-select-selector-duration').click().then(() => { //為什麼用then；selector是錯的
                cy.get('.ant-select-selection-search').select('week'); // selector是錯的
            }) 
        
        cy.get('#detail') // 不能少于100字
            .type('Enim expedita voluptate aperiam labore laboriosam velit id. Aut repellendus id omnis ex eligendi minus.');
        cy.get('button.ant-btn ant-btn-primary').click().then(() => { //需要时间跳转 用then可以吗？
            cy.get('#contentLayout > main').contains('Course Schedule'); // 得到一个新页面 但不是新url
        })
    })

    it('4, can submit course schedule',() =>{
        cy.get('#schedule_chapters_0_name').type('sint'); // input chapter name
        cy.get('#schedule_chapters_0_content').type('Dolorum magni eos dolor eum'); // input chapter content
        cy.get('#schedule > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div > div > div > div > div > button')
            .click(); // click button to add chapter 
        cy.get('#schedule_chapters_1_name').type('odio'); // second chapter
        cy.get('#schedule_chapters_1_content').type('Quia et voluptatum debitis voluptatum.'); // second content
        cy.get('span.ant-select-selection-item').click().then(() => {
            select('Wednesday'); // select time ( wrong selector)
        })
        cy.get('#schedule_classTime_0_time').click().then(() => { //选时间 用then让页面保持住 可以吗？
            cy.get('div.nt-picker-time-panel-cell-inner').first().contains('07').click();
            cy.get('div.nt-picker-time-panel-cell-inner').eq('1').contains('00').click();
            cy.get('div.nt-picker-time-panel-cell-inner').last().contains('00').click();
            cy.get('#schedule_classTime_0_time button').contains('ok').click();// 时间要记得点ok button
        })
        cy.get('#schedule button[type="submit"]').click().then(() =>{
            cy.get('#_next.ant-result ant-result-success').contains('title','Successfully Create Course') //为了有时间抓到message或新的页面 所以用then 可以吗？
            cy.get('#_next div.ant-message-notice-content').should('have.text', 'success');// message prompt that is success
        })
    })

})