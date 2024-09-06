import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage"

var baseURL = 'https://www.saucedemo.com/'
var standardUser = "standard_user"
var lockedOutUser = "locked_out_user"
var invalidUser = "invalid_user"
var correctPassword = "secret_sauce"
var incorrectPassword = "Secret_Sauce"

test.beforeEach(async({page}) => {
    await page.goto(baseURL)
})

test.describe('login', ()=>{

    test('successful login', async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.fillUsernameField(standardUser)
        await loginPage.fillPasswordField(correctPassword)
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL(baseURL+"inventory.html")
    })
})

test.describe('unsuccessful login', ()=>{

    test('login with invalid password', async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.fillUsernameField(standardUser)
        await loginPage.fillPasswordField(incorrectPassword)
        await loginPage.clickLoginButton()
        await expect(loginPage.getErrorMessageContainerText()).toContain("Username and password")
    })

    test('login with invalid username', async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.fillUsernameField(invalidUser)
        await loginPage.fillPasswordField(correctPassword)
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL(baseURL)
    })

    test('login with locked out user', async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.fillUsernameField(lockedOutUser)
        await loginPage.fillPasswordField(correctPassword)
        await loginPage.clickLoginButton()
        await expect(page).toHaveURL(baseURL)
    })

})