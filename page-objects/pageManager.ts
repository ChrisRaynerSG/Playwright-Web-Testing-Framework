import { Page, expect } from "@playwright/test"
import { LoginPage } from "./loginPage"
import { InventoryPage } from "./inventoryPage"
import { CheckoutPage } from "./checkoutPage"
import { ItemDetailsPage } from "./itemDetailsPage"
import { CartPage } from "./cartPage"

export class PageManager{

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly inventoryPage : InventoryPage
    private readonly cartPage: CartPage
    private readonly checkoutPage: CheckoutPage
    private readonly itemDetailsPage: ItemDetailsPage

    constructor(page: Page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.inventoryPage = new InventoryPage(this.page)
        this.cartPage = new CartPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.itemDetailsPage = new ItemDetailsPage(this.page)
    }

    getLoginPage(){
        return this.loginPage
    }

    getInventoryPage(){
        return this.inventoryPage
    }

    getCartPage(){
        return this.cartPage
    }

    getCheckoutPage(){
        return this.checkoutPage
    }

    getItemDetailPage(){
        return this.itemDetailsPage
    }

}