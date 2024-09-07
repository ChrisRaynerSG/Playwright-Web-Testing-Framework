import { Locator, Page } from "@playwright/test"
import { NavBarPage } from "./navBarPage";

export class InventoryPage extends NavBarPage{

    inventoryItemButton: Locator
    inventoryItem: Locator
    itemDetailLink: Locator
    itemName: string
    productSortContainer: Locator
    productSortOptions: Locator
    itemPrice: Locator
    itemNames: Locator

    constructor(page: Page){
        super(page)
        this.inventoryItemButton = page.locator('#inventory_container').getByRole('button')
        this.inventoryItem = page.locator('.inventory_item')
        this.productSortContainer = page.locator('select')
        this.productSortOptions = this.productSortContainer.locator('option')
        this.itemPrice = this.inventoryItem.locator('.inventory_item_price')
        this.itemNames = page.locator('.inventory_item_name')

    }

    async addFirstItemToCart(){
        await this.inventoryItemButton.first().click()
    }

    async getItemCount(){
        return await this.inventoryItemButton.count()
    }

    async addAllItemsToCart(){
        const itemCount = await this.getItemCount()
        for(var i = 0; i<itemCount; i++){
            await this.inventoryItemButton.nth(i).click()
        }
    }

    async addSpecificItemToCart(item: string){
        this.inventoryItemButton = this.page.locator('.inventory_item_description', {hasText: item}).getByText('Add to cart')
        await this.inventoryItemButton.click()

    }

    async removeFirstItemFromCart(){
        await this.inventoryItemButton.first().click()
    }

    async removeSpecificItemFromCart(item: string){
        this.inventoryItemButton = this.page.locator('.inventory_item_description', {hasText: item}).getByText('Remove')
        await this.inventoryItemButton.click()
    }

    async getSpecificItemButtonStatus(item: string){
        this.inventoryItemButton = this.page.locator('.inventory_item_description', {hasText: item}).getByRole("button")
        const buttonText  = await this.inventoryItemButton.textContent()
        return buttonText
    }

    async clickSpecificItemDetailLink(item: string){
        const itemDetailLink = this.itemNames.getByText(item)
        await itemDetailLink.click()
    }

    async getItemName(index: number){
        const itemName = await this.inventoryItem.nth(index).locator('.inventory_item_name').textContent()
        return itemName || ""
    }

    async openProductSortContainer(){
        await this.productSortContainer.click()
    }

    async isProductSortContainerVisible(){
        return await this.productSortOptions.first().isVisible()
    }

    async selectSortDropdownOption(option: string){
        await this.productSortContainer.selectOption(option)
    }

    async getAllProductPrices(){
        const priceList = await this.itemPrice.allTextContents()
        return priceList
    }
    
    async getAllProductNames(){
        const productNames = await this.itemNames.allTextContents()
        return productNames
    }
}