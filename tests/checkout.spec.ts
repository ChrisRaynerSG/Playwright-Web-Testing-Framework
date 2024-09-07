import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"

const baseURL = "/"

test.beforeEach(async({page})=>{
    await page.goto(baseURL)
    const pm = new PageManager(page)
    await pm.getLoginPage().successfulLogin()
})

test.describe('proceed to payment path with items in cart', ()=>{

    test.beforeEach(async({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().addAllItemsToCart()
        await pm.getInventoryPage().clickCartButton()
    })

    test('proceed to checkout step one', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickCheckoutButton()
        await expect(page).toHaveURL(baseURL+"checkout-step-one.html")
    
    })

})

test.describe('proceed to payment path without items in cart', ()=>{

    test.beforeEach(async({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().clickCartButton()
    })

    test('attempt to proceed to checkout step one', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickCheckoutButton()
        await expect(page).toHaveURL(baseURL+"cart.html")
        //currently nothing to stop this, future update test to include error container
    })
})