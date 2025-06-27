import CommonPage from "./commonPage";

class AboutPage  extends CommonPage{
    constructor(){
        super();

    }
    /**Navigate to the About menu bar */
    async aboutMenuBar(){
        await this.$menuBar("About").click();
    }
    /**Clicking on the 'Continue Shopping' button */
    async clickContinueShoppingButton(){
        await this.$button("Continue Shopping").scrollIntoView({block:"center"});
       await this.$button("Continue Shopping").click();
    }

}
export default new AboutPage();