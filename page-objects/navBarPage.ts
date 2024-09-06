import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"

export class NavBarPage extends HelperBase{

    readonly hamburgerButton: Locator
    readonly checkoutButton: Locator
    readonly allItems: Locator
    readonly about: Locator
    readonly logout: Locator

    constructor(page: Page){
        super(page)
        this.hamburgerButton = page.locator('.header_container').getByRole('button')
        this.checkoutButton = page.locator('#shopping_cart_container')
        this.allItems = page.getByText('All Items')
        this.about = page.getByText('About')
        this.logout = page.getByText('Logout')
    }
    
    async allItemsPage(){
        this.openNavBar()
        await this.allItems.click()
    }

    async aboutPage(){
        this.openNavBar()
        await this.about.click()

    }

    async logOutPage(){
        this.openNavBar()
        await this.logout.click()
    }

    async openNavBar(){
        await this.hamburgerButton.click()
    }
}