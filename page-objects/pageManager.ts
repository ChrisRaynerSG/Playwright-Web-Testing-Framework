import { Page, expect } from "@playwright/test"
import { LoginPage } from "./loginPage"
import { InventoryPage } from "./inventoryPage"
import { CheckoutPage } from "./checkoutPage"
import { ItemDetailsPage } from "./itemDetailsPage"

export class PageManager{

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly inventoryPage : InventoryPage
    private readonly checkoutPage: CheckoutPage
    private readonly itemDetailsPage: ItemDetailsPage

    constructor(page: Page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.inventoryPage = new InventoryPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.itemDetailsPage = new ItemDetailsPage(this.page)
    }

    getLoginPage(){
        return this.loginPage
    }

    getInventoryPage(){
        return this.inventoryPage
    }

    getCheckoutPage(){
        return this.checkoutPage
    }

    getItemDetailPage(){
        return this.itemDetailsPage
    }

}