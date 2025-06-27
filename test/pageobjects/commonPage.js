
export default class CommonPage {
    constructor() {
        this.$field = (id) => $(`//input[@id="${id}"]`);
        this.$button = (type) => $(`//button[text()="${type}"]`);
        this.$menuBar = (menu) => $(`//a[text()="${menu}"]`);
        this.$heading = () => $(`//div/h1`);
        this.$displayProduct =(text) => $(`//h1[text()="${text}"]`);
        this.$productTitle =()=> $(`//h1[contains(@class,"font-extrabold")]`);
        this.$filter = (filter) => $(`//span[text()="${filter}"]`);
        this.$checkBrand = (id) => $(`//input[@id="${id}"]`);
        this.$list = (list) => $(`//li[text()="${list}"]`);
        this.$product = () => $('//h2[@class="text-lg font-bold text-gray-800"]');
        this.$quantityCount =(productName, count) =>$(`//h1[text()="${productName}"]/../..//span[text()="${count}"]`);
        this.$shopNowButton =(product) =>$(`//a[@href="/shop?categories=${product}"]/button`);
        this.$toastMessage = () => $('//div[@class="Toastify__toast-container Toastify__toast-container--top-right"]');
        this.$addToCartButton =() =>$('(//div/button[text()="Add to Cart "])[1]');
        this.$cartProduct =(name) =>$(`//h1[text()="${name}"]`);
        this.$form =(form) =>$(`//input[@placeholder="${form}"]`);
        this.$textarea =() =>$('//textarea[@placeholder="Enter your message here"]');
        this.$checkBox =() =>$('//input[@type="checkbox"]');
        this.$details =(details) =>$(`//input[@name="${details}"]`);
        this.$detailsAddress =() =>$('//textarea[@name="address"]');
        this.$icon =(icon) =>$(`//a[@href="${icon}"]//div[@class="relative"]`)
        this.$iconNo =(no) =>$(`//a[@href="${no}"]//div[@class="relative"]`)
        this.$clickFirstProduct =(product)=>$(`//div[contains(@class,"gap-1")]//p[text()="${product}"]`);
        this.$profileMenuArrow = () => $('(//div[@class="relative"])[2]');
         this.$rightMenu = (menu) => $(`//a//li[text()="${menu}"]`);

         this.$profilePageHeading =() =>$(`//h2[contains(@class,"4xl ")]`)
         this.$firstProduct =() =>$(`(//div[contains(@class,"w-full h-96")]//img)[1]`)



    }
    /* launching the website. */
    async launchUrl() {
        await browser.url('https://www.playground.testingmavens.tools/');
        await browser.maximizeWindow();
        await this.$profileMenuArrow().waitForDisplayed({timeout:10000,timeoutMsg:"The page should be loaded and the down arrow needed to be displayed"});
    }
    /** Navigate to the Home page */
    async navigateToHome(){
        await this.$menuBar("Home").click();
    }
      async clickAddToCart(){
        
        await this.$addToCartButton().click();
    }
    // async clickOnAddToCartButton(){
    //     await this.$$addToCartButton
    // }

    
}