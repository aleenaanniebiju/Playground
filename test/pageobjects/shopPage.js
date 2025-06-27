import CommonPage from "./commonPage";


class ShopPage extends CommonPage {
    constructor() {
        super();
    }
    /* Navigating to the shop page */
    async productPage() {
        await this.$menuBar("Shop").waitForDisplayed({ timeout: 10000, timeoutMsg: "The 'shop' menu  should be displayed in the menu bar" });
        await this.$menuBar("Shop").click();
    }
    /**  Filtering the products by Brand
     *@param {string} brand
     */
    async filterByBrand(brand) {
        await this.$filter("Shop by Brand").waitForClickable({ timeout: 10000, timeoutMsg: "The 'shop by category' needed to be click" })
        await this.$filter("Shop by Brand").click();
        await this.$checkBrand(brand).waitForClickable({ timeout: 1000, timeoutMsg: "The checkbox needed to be checked" })
        await this.$checkBrand(brand).click();

    }
}
export default new ShopPage();