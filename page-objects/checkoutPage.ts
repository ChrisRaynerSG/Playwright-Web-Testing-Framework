import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase";

export class CheckoutPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }
}