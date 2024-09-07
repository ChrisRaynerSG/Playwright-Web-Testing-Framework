import { Page } from "@playwright/test"
import { NavBarPage } from "./navBarPage";

export class CheckoutStepTwoPage extends NavBarPage{

    constructor(page: Page){
        super(page)
    }
    
}