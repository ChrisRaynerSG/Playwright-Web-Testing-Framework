import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"

const baseURL = "/"
const inventoryPage = baseURL + "inventory.html"
const aboutPage = "https://saucelabs.com/"
const cartPage = baseURL + "cart.html"

test.beforeEach(async({page})=>{
    const pm = new PageManager(page)
    await page.goto(baseURL)
    await pm.getLoginPage().successfulLogin()
})

test.describe('Inventory page navbar tests', () =>{

    test('all items button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().clickAllItemsButton()
        await expect(page).toHaveURL(inventoryPage)
    })

    test('About button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().clickAboutButton()
        await expect(page).toHaveURL(aboutPage)
    })

    test('Logout button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().clickLogoutButton()
        await expect(page).toHaveURL(baseURL)
    })

    test('Go to cart button test', async({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().clickCartButton()
        await expect(page).toHaveURL(cartPage)
    })

})

test.describe('Item detail page navbar tests', () =>{

    test.beforeEach(async({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().clickSpecificItemDetailLink('Sauce Labs Backpack')
    })

    test('all items button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getItemDetailPage().clickAllItemsButton()
        await expect(page).toHaveURL(inventoryPage)
    })

    test('About button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getItemDetailPage().clickAboutButton()
        await expect(page).toHaveURL(aboutPage)
    })

    test('Logout button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getItemDetailPage().clickLogoutButton()
        await expect(page).toHaveURL(baseURL)
    })

    test('Go to cart button test', async({page})=>{
        const pm = new PageManager(page)
        await pm.getItemDetailPage().clickCartButton()
        await expect(page).toHaveURL(cartPage)
    })
})

test.describe('Cart page navbar tests', () =>{

    test.beforeEach(async({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().clickCartButton()
    })

    test('all items button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickAllItemsButton()
        await expect(page).toHaveURL(inventoryPage)
    })

    test('About button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickAboutButton()
        await expect(page).toHaveURL(aboutPage)
    })

    test('Logout button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickLogoutButton()
        await expect(page).toHaveURL(baseURL)
    })

    test('Go to cart button test', async({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickCartButton()
        await expect(page).toHaveURL(cartPage)
    })
    
})

test.describe('Checkout page navbar tests', () =>{

    test.beforeEach(async({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().addAllItemsToCart()
        await pm.getInventoryPage().clickCartButton()
        await pm.getCartPage().clickCheckoutButton()
    })

    test('all items button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCheckoutPage().clickAllItemsButton()
        await expect(page).toHaveURL(inventoryPage)
    })

    test('About button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCheckoutPage().clickAboutButton()
        await expect(page).toHaveURL(aboutPage)
    })

    test('Logout button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCheckoutPage().clickLogoutButton()
        await expect(page).toHaveURL(baseURL)
    })

    test('Go to cart button test', async({page})=>{
        const pm = new PageManager(page)
        await pm.getCheckoutPage().clickCartButton()
        await expect(page).toHaveURL(cartPage)
    })
})

test.describe('Checkout page 2 navbar tests', () =>{

    test.beforeEach(async({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().addAllItemsToCart()
        await pm.getInventoryPage().clickCartButton()
        await pm.getCartPage().clickCheckoutButton()
        await pm.getCheckoutPage().successfulContinue()
    })

        test('all items button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCheckoutPageTwo().clickAllItemsButton()
        await expect(page).toHaveURL(inventoryPage)
    })

    test('About button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCheckoutPageTwo().clickAboutButton()
        await expect(page).toHaveURL(aboutPage)
    })

    test('Logout button test', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getCheckoutPageTwo().clickLogoutButton()
        await expect(page).toHaveURL(baseURL)
    })

    test('Go to cart button test', async({page})=>{
        const pm = new PageManager(page)
        await pm.getCheckoutPageTwo().clickCartButton()
        await expect(page).toHaveURL(cartPage)
    })

    test.describe('Checkout complete navbar tests', () =>{

        test.beforeEach(async({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutPageTwo().clickFinishButton()
        })

        test('all items button test', async ({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutCompletePage().clickAllItemsButton()
            await expect(page).toHaveURL(inventoryPage)
        })
    
        test('About button test', async ({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutCompletePage().clickAboutButton()
            await expect(page).toHaveURL(aboutPage)
        })
    
        test('Logout button test', async ({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutCompletePage().clickLogoutButton()
            await expect(page).toHaveURL(baseURL)
        })
    
        test('Go to cart button test', async({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutCompletePage().clickCartButton()
            await expect(page).toHaveURL(cartPage)
        })
    })
})
