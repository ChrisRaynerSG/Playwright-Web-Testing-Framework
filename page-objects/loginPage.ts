import {Locator, Page} from "@playwright/test"
import { HelperBase } from "./helperBase"

export class LoginPage extends HelperBase{

    readonly usernameTextField: Locator
    readonly passwordTextField: Locator
    readonly loginButton: Locator
    readonly errorContainer: Locator

    constructor(page: Page){
        super(page)
        this.usernameTextField = page.getByPlaceholder("Username")
        this.passwordTextField = page.getByPlaceholder("Password")
        this.loginButton = page.getByRole("button")
        this.errorContainer = page.locator(".error")
    }

    async successfulLogin(){
        await this.fillUsernameField('standard_user')
        await this.fillPasswordField('secret_sauce')
        await this.clickLoginButton()
    }

    async fillUsernameField(username: string){
        await this.usernameTextField.click()
        await this.usernameTextField.fill(username)
    }

    async fillPasswordField(password: string){
        await this.passwordTextField.click()
        await this.passwordTextField.fill(password)
    }

    async clickLoginButton(){
        await this.loginButton.click()
    }

    async getErrorMessageContainerText(){
        await this.errorContainer.textContent()
    }
}