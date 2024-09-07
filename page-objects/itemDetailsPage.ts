import { Locator, Page } from "@playwright/test"
import { NavBarPage } from "./navBarPage";

export class ItemDetailsPage extends NavBarPage{

    readonly itemName: Locator
    readonly backToProductsButton: Locator
    readonly addToCartButton: Locator
    readonly removeButton: Locator

    constructor(page: Page){
        super(page)
        this.itemName = page.locator('.inventory_details_name')
        this.backToProductsButton = page.locator('#back-to-products')
        this.addToCartButton = page.getByText('Add to cart')
        this.removeButton = page.getByText('Remove')
    }

    async getItemName(){
        const itemName = await this.itemName.textContent()
        console.log(itemName)
        return itemName || ""
    }

    async clickBackToProductsButton(){
        await this.backToProductsButton.click()
    }

    async clickAddToCartButton(){
        await this.addToCartButton.click()
    }

    async clickRemoveButton(){
        await this.removeButton.click()
    }
}