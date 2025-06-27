import CommonPage from "./commonPage";

class ContactPage extends CommonPage {
    constructor() {
        super();
        this.$message = () => $('//p[@class="pb-20 w-full md:w-96 font-medium text-green-500"]')

    }
    /** Navigate to the Contact menu bar */
    async clickContactMenu() {
        await this.$menuBar("Contact").waitForDisplayed({ timeout: 1000, timeoutMsg: `The 'contact'm menu should be displayed` })
        await this.$menuBar("Contact").click();
    }
   /**
    * 
    * @param {*} Name 
    * @param {*} Email 
    * @param {*} messages 
    */
    async fillDetails(Name, Email, messages) {
        await this.$form("Enter your name here").waitForDisplayed({ timeout: 1000, timeoutMsg: `The field should be displayed` })
        await this.$form("Enter your name here").setValue(Name);
        await this.$form("Enter your email here").waitForDisplayed({ timeout: 1000, timeoutMsg: `The field should be displayed` })
        await this.$form("Enter your email here").setValue(Email);
        await this.$textarea().setValue(messages);

    }
    /**Click on the post button */
    async clickPostButton() {
        await this.$button("Post").waitForDisplayed({ timeout: 1000, timeoutMsg: `The 'post'button should be displayed ` });
        await this.$button("Post").waitForClickable({ timeout: 1000, timeoutMsg: `The 'Post' button must be clicked` })
        await this.$button("Post").click();
    }

}
export default new ContactPage();