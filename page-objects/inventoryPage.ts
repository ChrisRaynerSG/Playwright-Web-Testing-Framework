import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase";

export class InventoryPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }
}