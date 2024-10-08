import { Locator, Page } from "@playwright/test"
import { NavBarPage } from "./navBarPage";

export class CartPage extends NavBarPage{

    readonly checkoutButton: Locator
    readonly continueShoppingButton: Locator
    
    constructor(page: Page){
        super(page)
        this.checkoutButton = page.getByText('Checkout')
        this.continueShoppingButton = page.getByText('Continue Shopping')
    }

    async clickCheckoutButton(){
        await this.checkoutButton.click()
    }

    async clickContinueShoppingButton(){
        await this.continueShoppingButton.click()
    }

    async removeSpecificItemFromCart(item: string){
        await this.page.locator('.cart_item', {hasText: item}).getByText('Remove').click()
    }

    async getSpecificItemInCartName(item: string){
        const itemName = await this.page.locator('.cart_item', {hasText: item}).locator(".inventory_item_name").textContent()
        return itemName
    }

    async getSpecificItemInCartPrice(item: string){
        const itemPrice = await this.page.locator('.cart_item', {hasText: item}).locator(".inventory_item_price").textContent()
        return itemPrice
    }

    async getSpecificItemInCartQuantity(item: string){
        const itemQuantity = await this.page.locator('.cart_item', {hasText: item}).locator(".cart_quantity").textContent()
        return itemQuantity
    }

    async verifyEmptyCartListInCart(){
        const cartListCount = await this.page.locator('.cart_list div').count()
        return cartListCount == 2
    }

}