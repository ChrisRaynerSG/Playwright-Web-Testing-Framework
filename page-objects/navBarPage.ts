import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export abstract class NavBarPage extends HelperBase{

    readonly hamburgerButton: Locator
    readonly checkoutButton: Locator
    readonly shoppingCartBadge: Locator
    readonly allItems: Locator
    readonly about: Locator
    readonly logout: Locator

    constructor(page: Page){
        super(page)
        this.hamburgerButton = page.locator('.header_container').getByRole('button')
        this.checkoutButton = page.locator('#shopping_cart_container')
        this.shoppingCartBadge = page.locator('.shopping_cart_badge')
        this.allItems = page.getByText('All Items')
        this.about = page.getByText('About')
        this.logout = page.getByText('Logout')
    }
    
    async getAllItemsPage(){
        this.openNavBar()
        await this.allItems.click()
    }

    async getAboutPage(){
        this.openNavBar()
        await this.about.click()

    }

    async getLogoutPage(){
        this.openNavBar()
        await this.logout.click()
    }

    async openNavBar(){
        await this.hamburgerButton.click()
    }

    async getCheckoutPage(){
        await this.checkoutButton.click()
    }

    async getCartNumberOfItemsIndicatorNumber(): Promise<string|null> {
        const numberOfCartItems = await this.shoppingCartBadge.textContent()
        return numberOfCartItems || '0';
    }

    async isCartBadgeVisible(){
        return await this.shoppingCartBadge.isVisible()
    }
}