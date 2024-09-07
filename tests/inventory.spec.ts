import { test, expect } from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"

var baseURL = '/'

test.beforeEach(async({page})=>{
    const pm = new PageManager(page)
    await page.goto(baseURL)
    await pm.getLoginPage().successfulLogin()
})

test.describe('add items to cart', ()=>{

    test('add single item to cart adds item to cart', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().addFirstItemToCart()
        const numberOfCartItems = await pm.getInventoryPage().getCartNumberOfItemsIndicatorNumber()
        expect(numberOfCartItems).toEqual('1')
    })

    test('add all items on page to cart adds all items on page', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().addAllItemsToCart()
        const numberOfCartItems = await pm.getInventoryPage().getCartNumberOfItemsIndicatorNumber()
        expect(numberOfCartItems).toEqual('6')
    })

    test('add specific item more than once adds item twice', async ({page})=>{
        const pm = new PageManager(page)
        for(let i = 0; i<2; i++){
            pm.getInventoryPage().addSpecificItemToCart('Sauce Labs Backpack')
            const numberOfCartItems = await pm.getInventoryPage().getCartNumberOfItemsIndicatorNumber()
        }
        const numberOfCartItems = await pm.getInventoryPage().getCartNumberOfItemsIndicatorNumber()
        expect(numberOfCartItems).toEqual('2')
    })

})

test.describe('remove items from cart', ()=>{

    test('successful remove item from cart', async ({page})=> {
        const pm = new PageManager(page)
        await pm.getInventoryPage().addFirstItemToCart()
        await pm.getInventoryPage().removeFirstItemFromCart()
        const isCartBadgeVisible = await pm.getInventoryPage().isCartBadgeVisible()
        expect(isCartBadgeVisible).toEqual(false)
    })

    test('successful remove specific item from cart', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().addAllItemsToCart()
        await pm.getInventoryPage().removeSpecificItemFromCart('Sauce Labs Backpack')
        const numberOfCartItems = await pm.getInventoryPage().getCartNumberOfItemsIndicatorNumber()
        const buttonText = await pm.getInventoryPage().getSpecificItemButtonStatus('Sauce Labs Backpack')
        expect(numberOfCartItems).toEqual('5')
        expect(buttonText).toEqual("Add to cart")
    })
})

test.describe('click item link sends to item details page', ()=>{

    test('click on item name sends to that specific items page', async ({page})=>{
        const pm = new PageManager(page)
        for(let i = 0; i < await pm.getInventoryPage().getItemCount(); i++){
            const itemName = await pm.getInventoryPage().getItemName(i)
            pm.getInventoryPage().clickSpecificItemDetailLink(itemName)
            expect(await pm.getItemDetailPage().getItemName()).toEqual(itemName)
            await pm.getItemDetailPage().clickBackToProductsButton()
        }
        await expect(page).toHaveURL(baseURL+"inventory.html")
    })

})

test.describe('item sort feature', ()=> {

    test('click on dropdown displays sort list', async ({page})=>{
        const pm = new PageManager(page)
        await pm.getInventoryPage().openProductSortContainer()
        const isProductContainerVisible = await pm.getInventoryPage().isProductSortContainerVisible()
        expect(isProductContainerVisible).toEqual(true)
        // Will not work due to using native select HTML element
    })

    test('click on A-Z filters sorts by A-Z', async ({page})=>{
        const pm = new PageManager(page)
        const itemNames = await pm.getInventoryPage().getAllProductNames()
        const itemNamesSorted = itemNames.sort((a,b)=> a.localeCompare(b))
        await pm.getInventoryPage().selectSortDropdownOption('az')
        const itemNamesAfterClick = await pm.getInventoryPage().getAllProductNames()
        expect(itemNamesAfterClick).toEqual(itemNamesSorted)
    })

    test('click on Z-A filters sorts by Z-A', async ({page})=>{
        const pm = new PageManager(page)
        const itemNames = await pm.getInventoryPage().getAllProductNames()
        const itemNamesSorted = itemNames.sort((a,b)=> b.localeCompare(a))
        await pm.getInventoryPage().selectSortDropdownOption('za')
        const itemNamesAfterClick = await pm.getInventoryPage().getAllProductNames()
        expect(itemNamesAfterClick).toEqual(itemNamesSorted)
    })

    test('click on low to high sorts items by low to high', async ({page})=>{
        const pm = new PageManager(page)
        const priceList = await pm.getInventoryPage().getAllProductPrices()
        const sortedPrices = priceList.sort((a,b)=>{
            const numA = parseFloat(a.replace('$', ''))
            const numB = parseFloat(b.replace('$',''))
            return numA - numB
        })
        await pm.getInventoryPage().selectSortDropdownOption('lohi')
        const priceListAfterClick = await pm.getInventoryPage().getAllProductPrices()
        expect(priceListAfterClick).toEqual(sortedPrices)

    })

    test('click on high to low sorts items by high to low', async ({page})=>{
        const pm = new PageManager(page)
        const priceList = await pm.getInventoryPage().getAllProductPrices()
        const sortedPrices = priceList.sort((a,b)=>{
            const numA = parseFloat(a.replace('$', ''))
            const numB = parseFloat(b.replace('$',''))
            return numB - numA
        })
        await pm.getInventoryPage().selectSortDropdownOption('hilo')
        const priceListAfterClick = await pm.getInventoryPage().getAllProductPrices()
        expect(priceListAfterClick).toEqual(sortedPrices)
    })
})