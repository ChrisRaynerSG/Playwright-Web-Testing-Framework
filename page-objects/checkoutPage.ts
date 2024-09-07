import { Locator, Page } from "@playwright/test"
import { NavBarPage } from "./navBarPage";

export class CheckoutPage extends NavBarPage{

    firstNameField: Locator
    lastNameField: Locator
    zipPostalCodeField: Locator
    continueButton: Locator
    cancelButton: Locator
    errorMessageContainer: Locator

    constructor(page: Page){
        super(page)
        this.firstNameField = page.getByPlaceholder('First Name')
        this.lastNameField = page.getByPlaceholder('Last Name')
        this.zipPostalCodeField = page.getByPlaceholder('Zip/Postal Code')
        this.continueButton = page.getByText('Continue')
        this.cancelButton = page.getByText('Cancel')
        this.errorMessageContainer = page.locator('h3:has-text("Error")')
    }

    async clickContinueButton(){
        await this.continueButton.click()
    }

    async clickCancelButton(){
        await this.cancelButton.click()
    }

    async fillFirstNameField(firstName: string){
        await this.firstNameField.fill(firstName)
    }

    async fillLastNameField(lastName: string){
        await this.lastNameField.fill(lastName)
    }

    async fillZipCodeField(zipCode: string){
        await this.zipPostalCodeField.fill(zipCode)
    }

    async successfulContinue(){
        await this.fillFirstNameField("Joe")
        await this.fillLastNameField("Bloggs")
        await this.fillZipCodeField("12345-1234")
        await this.clickContinueButton()
    }

    async getErrorMessage(){
        const errorMessage = await this.errorMessageContainer.textContent()
        return errorMessage
    }
}