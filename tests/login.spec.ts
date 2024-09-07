import { test, expect } from "@playwright/test"
import { LoginPage } from "../page-objects/loginPage"
import { PageManager } from "../page-objects/pageManager"
import exp from "constants"

var baseURL = '/'
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
        const pm = new PageManager(page)
        await pm.getLoginPage().fillUsernameField(standardUser)
        await pm.getLoginPage().fillPasswordField(correctPassword)
        await pm.getLoginPage().clickLoginButton()
        await expect(page).toHaveURL(baseURL+"inventory.html")
    })
})

test.describe('unsuccessful login', ()=>{

    test('login with invalid password', async ({page}) => {
        const pm = new PageManager(page)
        await pm.getLoginPage().fillUsernameField(standardUser)
        await pm.getLoginPage().fillPasswordField(incorrectPassword)
        await pm.getLoginPage().clickLoginButton()
        const errorMessage = await pm.getLoginPage().getErrorMessageContainerText()
        expect(errorMessage).toContain("Username and password do not match any user in this service")
    })

    test('login with invalid username', async ({page}) => {
        const pm = new PageManager(page)
        await pm.getLoginPage().fillUsernameField(invalidUser)
        await pm.getLoginPage().fillPasswordField(correctPassword)
        await pm.getLoginPage().clickLoginButton()
        await expect(page).toHaveURL(baseURL)
        const errorMessage = await pm.getLoginPage().getErrorMessageContainerText()
        expect(errorMessage).toContain("Username and password do not match any user in this service")
    })

    test('login with locked out user', async ({page}) => {
        const pm = new PageManager(page)
        await pm.getLoginPage().fillUsernameField(lockedOutUser)
        await pm.getLoginPage().fillPasswordField(correctPassword)
        await pm.getLoginPage().clickLoginButton()
        await expect(page).toHaveURL(baseURL)
        const errorMessage = await pm.getLoginPage().getErrorMessageContainerText()
        expect(errorMessage).toContain("Sorry, this user has been locked out.")
    })
})

test.describe('logout', ()=>{

    test('successful logout from home', async ({page}) => {
        const pm = new PageManager(page)
        await pm.getLoginPage().successfulLogin()
        await expect(page).toHaveURL(baseURL+"inventory.html")
        await pm.getInventoryPage().getLogoutPage()
        await expect(page).toHaveURL(baseURL)
    })

    test('successful logout from cart', async ({page}) =>{
        const pm = new PageManager(page)
        await pm.getLoginPage().successfulLogin()
        await expect(page).toHaveURL(baseURL+"inventory.html")
        await pm.getInventoryPage().getCheckoutPage()
        await expect(page).toHaveURL(baseURL+"cart.html")
        await pm.getCheckoutPage().getLogoutPage()
        await expect(page).toHaveURL(baseURL)
    })

    test('successful logout from item detail page', async ({page})=>{
        const pm = new PageManager(page)
    })
})