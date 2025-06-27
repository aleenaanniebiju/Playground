import CommonPage from "./commonPage";

class ProfilePage extends CommonPage {
  constructor() {
    super();
    this.$profile = () => $(`//a//li[text()="Profile"]`)
    this.$editButton =() =>$(`//button[text()="Edit"]`)
    this.$profileHeading=() =>$(`//h2[contains(@class,"4xl ")]`)
    this.$genderSelection =() =>$(`//select[@name="gender"]`)
    this.$bio =() =>$('//textarea[@name ="bio"]')
    this.$saveButton =() =>$(`//button[@type="submit"]`)
    this.$logOut =() =>$(`//li[text()="Log Out"]`)


  }
  /** Clicking on the profile down menu arrow */
  async clickProfileMenuArrow(){
    await this.$profileMenuArrow().waitForDisplayed({ timeout: 10000, timeoutMsg: "The down arrow should be displayed" });
    await this.$profileMenuArrow().waitForClickable({ timeout: 1000, timeoutMsg: "The down arrow menu should be clickable" })
    await this.$profileMenuArrow().click();
  }
  /** Clicking  on the profile menu   */
  async clickProfileMenu() {
    
    await this.$profile().click();

  }
  /** Clicking on the log out menu */
  async clickLogOut(){
   
    await this.$logOut().click();
  }
  /** Clicking on the 'edit' button on the profile page */
  async clickEditButton() {
    await this.$editButton().waitForDisplayed({ timeout: 10000,timeoutMsg:"The 'edit' button should be displayed" })
     await this.$editButton().waitForDisplayed({ timeout: 10000,timeoutMsg:"The 'edit' button should be clickable"})
    await this.$editButton().click();
  }
  /** Filling the details
   * @param {string} bio 
   * @param {string} country 
   * @param {string} name 
   */
  async editDetails(name,country,bio){
    await this.$details("fullName").waitForDisplayed({timeout:10000,timeoutMsg:'The  input  field should be displayed'});
    await this.$details("fullName").clearValue();
    await this.$details("fullName").setValue(name)
    await this.$genderSelection().waitForDisplayed({timeout:1000,timeoutMsg:"The input field for selection should be visible"});
    await this.$genderSelection().click();
    await this.$genderSelection().selectByVisibleText('Male');
    await this.$details("country").waitForDisplayed({timeout:10000,timeoutMsg:'The input field should be displayed'})
    await this.$details("country").clearValue();
     await this.$details("country").setValue(country)
      await this.$bio().waitForDisplayed({timeout:10000,timeoutMsg:'The input field should be displayed'})
     await this.$bio().clearValue();
     await this.$bio().setValue(bio)


  }
  /** Clicking on the 'save' button on the profile page */
  async clickSaveButton(){
    await this.$saveButton().click();
  }
  /** Accepting 'Alert Box' */
  async clickOkOnAlert(){
      await browser.waitUntil(async () => await browser.isAlertOpen(), {
            timeout: 10000,
            timeoutMsg: "Expected alert to be displayed",
        });
     const alertText = await browser.getAlertText();
        console.log("Alert says:", alertText);

        await browser.acceptAlert();
        await this.$toastMessage().waitForDisplayed({timeout:1000})
  }
  
}
export default new ProfilePage();