import { Page } from "@playwright/test"
import { HelperBase } from "./helperBase";

export class ItemDetailsPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }
}