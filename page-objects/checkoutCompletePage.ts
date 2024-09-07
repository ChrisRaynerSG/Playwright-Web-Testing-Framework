import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase";
import { NavBarPage } from "./navBarPage";

export class CheckoutCompletePage extends NavBarPage {

    thankYouMessage: Locator
    backHomeButton: Locator

    constructor(page: Page){
        super(page)
        this.thankYouMessage = page.locator('.complete-header')
        this.backHomeButton = page.getByText('Back Home')
    }

    async getThankYouMessageText(){
        const messageText = await this.thankYouMessage.textContent()
        return messageText
    }

    async clickBackHomeButton(){
        await this.backHomeButton.click()
    }
}