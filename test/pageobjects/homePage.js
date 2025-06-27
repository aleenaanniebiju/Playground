import CommonPage from "./commonPage";

class HomePage extends CommonPage {
    constructor() {
        super();
        this.$Category = () => $('//p[text()="Shop by Category"]');
        this.$shopNowButton =() =>$(`//h2[@class="text-4xl md:text-5xl lg:text-5xl font-bold mb-6"]/following-sibling::div/a/button`);
         this.$firstProduct =() => $('//div[@data-index="0"]//div[@class="px-2"]');
    }
    /**  Clicking  on  the  'Shop by Category' menu  */
    async clickOnShopByCategory() {
        await this.$Category().waitForDisplayed({ timeout: 10000, timeoutMsg: "The category menu should be displayed" });
        await this.$Category().click();
    }
    /**  Choosing the category from the menu 
   *@param {string} category
  */
    async chooseCategory(category) {
        await this.$list(category).waitForClickable({ timeout: 10000, timeoutMsg: "The 'Category' should be clickable" })
        await this.$list(category).click()
        
    }
    /** Searching the product using search bar
     * @param {string } products
     */
    async searchBar(products){
        await this.$form("Search your products here").setValue(products);
        await this.$clickFirstProduct("Dell XPS 13").waitForDisplayed({timeout:5000,timeoutMsg:"The list of searched products should be displayed"})
        await this.$clickFirstProduct("Dell XPS 13").waitForClickable({timeout:5000,timeoutMsg:"The first product that is displayed should be clicked"})
        await this.$clickFirstProduct("Dell XPS 13").click();

    }
      /** Clicking on the shop Now button */
    async clickShopNowButton(){
        await this.$shopNowButton().waitForDisplayed({timeout:5000,timeoutMsg:"The 'shop now 'button should be displayed"});
        await this.$shopNowButton().scrollIntoView({block:"center"});
        await this.$shopNowButton().waitForClickable({timeout:5000,timeoutMsg:"tThe 'shop now' button should be clickable"})
        await this.$shopNowButton().click();

    }
     /** Clicking on the first product under " New arrivals" */ 
    async clickFirstProduct(){
        await this.$firstProduct().waitForClickable({timeout:5000,timeoutMsg:"The product needed to be clicked"});
        await this.$firstProduct().click();
    }
    /** Clicking on the add to cart button */
    async clickAddToCartButton(){
        await this.$button("Add to Cart ").scrollIntoView({block:"center"});
        await this.$button("Add to Cart ").click();
    }
     /*Clicking on the 'Proceed to CheckOut' button */
    async clickProceedToCheckOutButton() {
        await this.$button("Proceed to Checkout").scrollIntoView({ block: "center" });
        await this.$button("Proceed to Checkout").click();
    }
}
export default new HomePage();