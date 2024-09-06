import { Page, expect } from "@playwright/test"
import { LoginPage } from "./loginPage"
import { NavBarPage } from "./navBarPage"

export class PageManager{

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly navBarPage: NavBarPage

    constructor(page: Page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.navBarPage = new NavBarPage(this.page)
    }

    getLoginPage(){
        return this.loginPage
    }

    getNavBarPage(){
        return this.navBarPage
    }

}