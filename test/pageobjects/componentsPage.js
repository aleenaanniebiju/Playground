import CommonPage from "./commonPage";

class ComponentPage extends CommonPage{
    constructor(){
        super();
        this.$learnMoreLink =() => $('//h2[text()="Pop Window Component"]/following-sibling::a[text()="Learn more"]');
        this.$popWindow =() =>$('//h2[text()="Pop Window Content"]');
    }
    /* Navigate to the Components page */
    async componentsPage(){
        await this.$menuBar("Components").waitForDisplayed({timeout:1000,timeoutMsg:"The 'components' menu should be displayed in the menu bar."});
        await this.$menuBar("Components").waitForClickable({timeout:5000,timeoutMsg:"The 'components' menu should be clickable"})
        await this.$menuBar("Components").click();

    }
    /* Click in the 'Learn more' link on the 'Pop Window Component' tile */
    async popWindowComponent(){
        await this.$learnMoreLink().scrollIntoView({ block: 'start' });
        await this.$learnMoreLink().waitForClickable({timeout:5000,timeoutMsg:"The 'Learn More' link should be clickable"})
        await this.$learnMoreLink().click();
    }
    /*Click on the 'Open Pop Window' button and verify the pop up window is opened*/
    async OpenPopWindowButton(){
        await this.$button("Open Pop Window").waitForClickable({ timeout: 5000 ,timeoutMsg:"The 'Open Pop Window' button should be clickable." });
        await this.$button("Open Pop Window").scrollIntoView({ block: 'start' });
        await this.$button("Open Pop Window").click();
    }
    /**Click on the close button */
    async closePopWindow(){
        await this.$button("Close").waitForDisplayed({timeout:5000,timeoutMsg:"The 'Close' button should be displayed"});
        await this.$button("Close").waitForClickable({timeout:1000,timeoutMsg:"The 'Close' button should be clickable"})
        await this.$button("Close").click();
    }

}
export default new ComponentPage();