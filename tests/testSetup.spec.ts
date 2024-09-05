import {test} from "@playwright/test"
 
test.beforeEach(async({page}) => {
    await page.goto('https://www.saucedemo.com/')
})

test('open home page', async ({page}) => { 
    await page.getByText('Login').click()
})

test.describe('login', ()=>{
    test('successful login', async ({page}) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByText('Login').click()
        // Assert logged in? 
        // await page.getByRole('textbox', {name: "Username"}).click()
        // await page.getByRole('textbox', {name: "Password"}).click()
    })
})

test.describe('add item to cart', ()=>{
    test.beforeEach(async({page}) => {
        await page.getByText('Login').click()
    })
})