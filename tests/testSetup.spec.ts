import {test, expect} from "@playwright/test"
 
var baseURL = '/'
var standardUser = "standard_user"
var lockedOutUser = "locked_out_user"
var password = "secret_sauce"


test.beforeEach(async({page}) => {
    await page.goto(baseURL)
})

test('open home page', async ({page}) => { 
    await page.getByText('Login').click()
}) 

test.describe('login', ()=>{

    test('successful login', async ({page}) => {
        await page.getByPlaceholder('Username').pressSequentially(standardUser, {delay: 50})
        await page.getByPlaceholder('Password').pressSequentially(password, {delay: 50})
        await page.getByText('Login').click()
        await expect(page).toHaveURL(baseURL+"inventory.html")
        // await page.getByRole('textbox', {name: "Username"}).click()
        // await page.getByRole('textbox', {name: "Password"}).click()
    })
})

test.describe('add item to cart', ()=>{
    test.beforeEach(async({page}) => {
        await page.getByText('Login').click()
    })
})