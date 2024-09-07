import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"

const baseURL = "/"

test.beforeEach(async({page})=>{
    await page.goto(baseURL)
    const pm = new PageManager(page)
    await pm.getLoginPage().successfulLogin()
})

test.describe('navigation paths for checkout', ()=>{
    test.beforeEach(async({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().addAllItemsToCart()
        await pm.getInventoryPage().clickCartButton()
    })
    test('continue shopping button on cart returns to inventory page', async({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickContinueShoppingButton()
        await expect(page).toHaveURL(baseURL + "inventory.html")
    })
    test('cancel button on checkout one page returns to cart', async({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickCheckoutButton()
        await pm.getCheckoutPage().clickCancelButton()
        await expect(page).toHaveURL(baseURL + "cart.html")
    })
    test('cancel button on checkout two page returns to cart', async({page})=>{
        const pm = new PageManager(page)
        await pm.getCartPage().clickCheckoutButton()
        await pm.getCheckoutPage().successfulContinue()
        await pm.getCheckoutPageTwo().clickCancelButton()
        await expect(page).toHaveURL(baseURL + "cart.html")
    })
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

    test.describe('proceed to checkout page two', ()=>{
        test.beforeEach(async({page})=>{
            const pm = new PageManager(page)
            await pm.getCartPage().clickCheckoutButton()
        })

        test('invalid credentials', async ({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutPage().fillFirstNameField('Joe')
            await pm.getCheckoutPage().fillLastNameField('Bloggs')
            await pm.getCheckoutPage().fillZipCodeField('12')
            await pm.getCheckoutPage().clickContinueButton()
            await expect(page).toHaveURL(baseURL+"checkout-step-one.html")
            expect(await pm.getCheckoutPage().getErrorMessage()).toEqual("Error: Postal Code is invalid")
        
        })

        test('missing first name field', async ({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutPage().fillLastNameField('Bloggs')
            await pm.getCheckoutPage().fillZipCodeField('12345-1234')
            await pm.getCheckoutPage().clickContinueButton()
            await expect(page).toHaveURL(baseURL+"checkout-step-one.html")
            expect(await pm.getCheckoutPage().getErrorMessage()).toEqual("Error: First Name is required")
        
        })    

        test('missing last name field', async ({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutPage().fillFirstNameField('Joe')
            await pm.getCheckoutPage().fillZipCodeField('12345-1234')
            await pm.getCheckoutPage().clickContinueButton()
            await expect(page).toHaveURL(baseURL+"checkout-step-one.html")
            expect(await pm.getCheckoutPage().getErrorMessage()).toEqual("Error: Last Name is required")
        })    

        test('missing zip/postal code field', async ({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutPage().fillFirstNameField('Joe')
            await pm.getCheckoutPage().fillLastNameField('Bloggs')
            await pm.getCheckoutPage().clickContinueButton()
            await expect(page).toHaveURL(baseURL+"checkout-step-one.html")
            expect(await pm.getCheckoutPage().getErrorMessage()).toEqual("Error: Postal Code is required")
        
        })    

        test('valid credentials', async ({page})=>{
            const pm = new PageManager(page)
            await pm.getCheckoutPage().fillFirstNameField('Joe')
            await pm.getCheckoutPage().fillLastNameField('Bloggs')
            await pm.getCheckoutPage().fillZipCodeField('12')
            await pm.getCheckoutPage().clickContinueButton()
            await expect(page).toHaveURL(baseURL+"checkout-step-two.html")
        }) 

        test.describe('complete purchase', ()=>{

            test.beforeEach(async({page})=>{
                const pm = new PageManager(page)
                await pm.getCheckoutPage().successfulContinue()
            })

            test('validate price of items in cart matches subtotal', async ({page})=>{
                const pm = new PageManager(page)
                const isTrue = await pm.getCheckoutPageTwo().verifyItemPriceEqualsSubtotal()
                expect(isTrue).toEqual(true)
            })
            test('validate subtotal plus tax equals total', async ({page})=>{
                const pm = new PageManager(page)
                const isTrue = await pm.getCheckoutPageTwo().verifySubtotalAndTaxEqualsTotal()
                expect(isTrue).toEqual(true)
            })
            test('completing purchase returns to inventory page and empties cart', async({page})=>{
                const pm = new PageManager(page)
                await pm.getCheckoutPageTwo().clickFinishButton()
                await expect(page).toHaveURL(baseURL+"checkout-complete.html")
                const thankYouMessage = await pm.getCheckoutCompletePage().getThankYouMessageText()
                expect(thankYouMessage).toEqual("Thank you for your order!")
                const isCartBadgeVisible = await pm.getCheckoutCompletePage().isCartBadgeVisible()
                expect(isCartBadgeVisible).toEqual(false)
                await pm.getCheckoutCompletePage().clickBackHomeButton()
                await expect(page).toHaveURL(baseURL+"inventory.html")
            })
        })
    })
})

test.describe('proceed to checkout without items in cart', ()=>{

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
