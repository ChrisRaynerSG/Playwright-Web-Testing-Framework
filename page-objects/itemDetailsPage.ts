import { Locator, Page } from "@playwright/test"
import { NavBarPage } from "./navBarPage";

export class ItemDetailsPage extends NavBarPage{

    readonly itemName: Locator
    readonly backToProductsButton: Locator

    constructor(page: Page){
        super(page)
        this.itemName = page.locator('.inventory_details_name')
        this.backToProductsButton = page.locator('#back-to-products')
    }

    async getItemName(){
        const itemName = await this.itemName.textContent()
        console.log(itemName)
        return itemName || ""
    }

    async clickBackToProductsButton(){
        await this.backToProductsButton.click()
    }
}