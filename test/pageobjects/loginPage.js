import CommonPage from "./commonPage";

class LoginPage extends CommonPage{
    constructor() {
        super();
        this.$profileIcon =() =>$(`//p[text()="Profile"]`)
    }
/**
 * 
 * @param {string} email 
 * @param {string} password 
 */
    async clickLogin(email,password) {
        await this.$profileMenuArrow().waitForDisplayed({timeout:1000,timeoutMsg:"The menu arrow should be displayed"});
        await this.$profileMenuArrow().click();
        await this.$rightMenu("Login").click();
         await this.$field("email").setValue(email);
        await this.$field("password").setValue(password);
        await this.$button("Login").click();

    }
    
}
export default new LoginPage();