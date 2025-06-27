import CommonPage from "./commonPage";
class CartPage extends CommonPage {
    constructor() {
        super();
        this.$clickProduct = () => $('(//div[contains(@class," group p-4")]//div//img)[1]');
        this.$description = () => $('//h1/following-sibling::p[@class="text-gray-700"]');
        this.$cartNo = () => $('//a[@href="/cart"]//span');
        this.$quantityInput = (value) => $(`//h1[text()="${value}"]/../..//div[contains(@class,"gap")]/p`);
        this.$cartMessage = () => $('//div[contains(@class, "gap-4")]//h1');
        this.$productPrice = () => $$(`//div[contains(@class,"font-titleFont")]/p`);
        this.$subTotal = () => $('//div[contains(@class,"mb-2")]/span/following-sibling::span');
        this.$successMessage = () => $('//span[contains(@class,"font-semibold text-lg")]');

    }
    /**Clicking on the product */
    async clickOnProduct() {
        await this.$clickProduct().scrollIntoView({ block: "center" });
        await this.$clickProduct().click();
    }
    /**Clicking on the 'Add to Cart' button */
    async clickOnAddToCart() {
         await this.$button("Add to Cart").scrollIntoView({ block: "center" });
        await this.$button("Add to Cart").waitForClickable({ timeout: 10000, timeoutMsg: "The 'Add to cart' button should be displayed for the click" });
        await this.$button("Add to Cart").click();
        await this.$cartNo().scrollIntoView({ block: "center" })
        await this.$cartNo().waitForDisplayed({ timeout: 1000, timeoutMsg: "The cart no should be updated after clicking on the button" })


    }
    /* Clicking on the cart icon */
    async clickCartIcon() {
        await this.$icon("/cart").scrollIntoView({block:'center'})
        await this.$icon("/cart").click();

    }
     /* adding multiple quantity of the same product */
    async addMultipleQuantity(productName, count = 6) {
    for (let i = 0; i < count; i++) {
        const plusBtn = this.$quantityCount(productName, "+");
        await plusBtn.waitForClickable({ timeout: 10000 });
        await plusBtn.click();
        await browser.pause(300); 
    }
    await this.$quantityInput(productName).waitForDisplayed({ timeout: 10000 });
}
    /* Reducing the quantity of the same product */
    async reducingQuantity(productName, count = 1) {
        for (let i = 0; i < count; i++) {
            await this.$quantityCount(productName, "-").waitForClickable({timeout:10000,timeoutMsg:"The count of the product should be decreased"})
            await this.$quantityCount(productName, "-").click();
           
        }
        await this.$quantityInput(productName).waitForDisplayed({timeout:10000,timeoutMsg:"The count number should be updated"})
    }
     /*Clicking on the reset Button */
    async clickingResetButton() {
        await this.$button("Reset cart").waitForClickable({timeout:5000,timeoutMsg:"The 'Reset cart' button should be clicked"});
        await this.$button("Reset cart").scrollIntoView({block:"center"});
        await this.$button("Reset cart").click();
    }
     /*Clicking on the 'Proceed to CheckOut' button */
    async clickProceedToCheckOutButton() {
        await this.$button("Proceed to Checkout").waitForClickable({timeout:5000,timeoutMsg:"The 'Proceed to CheckOut' button should be clicked"})
        await this.$button("Proceed to Checkout").scrollIntoView({ block: "center" });
        await this.$button("Proceed to Checkout").click();
    }
     /**Click on the continue shopping button */
    async clickContinueShoppingButton() {
        await this.$button("Continue Shopping").scrollIntoView({ block: "center" });
        await this.$button("Continue Shopping").click();
    }
    /** Calculating the the total price of the products is equal to the subtotal */
    async calculatingSubtotal() {
        const productPriceElements = await this.$productPrice();
        let totalPrice = 0;
        for (const priceElement of productPriceElements) {
            const priceText = await priceElement.getText();
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));
            totalPrice += price;
        }

        await this.$button("Proceed to Checkout").click();
        const subtotalText = await this.$subTotal().getText();
        const subtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ""));
        return { totalPrice, subtotal }


    }


}
export default new CartPage();