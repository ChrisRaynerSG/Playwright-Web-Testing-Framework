import { Page } from "@playwright/test"
import { NavBarPage } from "./navBarPage";

export class CheckoutPage extends NavBarPage{

    constructor(page: Page){
        super(page)
    }
}