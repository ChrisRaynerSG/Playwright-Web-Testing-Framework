import { Locator, Page } from "@playwright/test"
import { NavBarPage } from "./navBarPage";

export class CheckoutStepTwoPage extends NavBarPage{

    readonly finishButton: Locator
    readonly cancelButton: Locator
    readonly subtotalAmount: Locator
    readonly taxAmount: Locator
    readonly totalAmount: Locator
    readonly itemPrices: Locator

    constructor(page: Page){
        super(page)
        this.finishButton = page.getByText('Finish')
        this.cancelButton = page.getByText('Cancel')
        this.subtotalAmount = page.locator('.summary_subtotal_label')
        this.taxAmount = page.locator('.sumamry_tax_label')
        this.totalAmount = page.locator('summary_total_label')
        this.itemPrices = page.locator('.inventory_item_price')
    }

    async clickFinishButton(){
        await this.finishButton.click()
    }

    async clickCancelButton(){
        await this.cancelButton.click()
    }

    async getSubtotalAmount(){
        const subtotalAmountString = await this.subtotalAmount.textContent() || "0"
        const subtotalAmountNumber = parseFloat(subtotalAmountString.replace('Item total: $', ""))
        return subtotalAmountNumber
    }

    async getTaxAmount(){
        const taxAmountString = await this.taxAmount.textContent() || "0"
        const taxAmountNumber = parseFloat(taxAmountString.replace('Tax: $', ""))
        return taxAmountNumber
    }

    async getTotalAmount(){
        const totalAmountString = await this.totalAmount.textContent() || "0"
        const totalAmountNumber = parseFloat(totalAmountString.replace('Total: $', ""))
        return totalAmountNumber
    }

    async verifyItemPriceEqualsSubtotal(){
        const subtotalAmount = await this.getSubtotalAmount()
        var total = 0
        for (var i = 0; i<await this.itemPrices.count(); i++){
            const value = await this.itemPrices.nth(i).textContent() || "9"
            const valueNumber = parseFloat(value.replace("$", ""))
            total += valueNumber
        }
        return subtotalAmount == total
    }

    async verifySubtotalAndTaxEqualsTotal(){
        const subtotalAmount = await this.getSubtotalAmount()
        const taxAmount = await this.getTaxAmount()
        const totalAmount = await this.getTotalAmount()
        return subtotalAmount + taxAmount === totalAmount
    }
    
}