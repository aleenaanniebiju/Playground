import homePage from "../pageobjects/homePage.js";
import testData from "../TestData/testData.json" with { type: 'json' };
import loginPage from "../pageobjects/loginPage.js";
import shopPage from "../pageobjects/shopPage.js";
import componentsPage from "../pageobjects/componentsPage.js";
import cartPage from "../pageobjects/cartPage.js";
import contactPage from "../pageobjects/contactPage.js";
import paymentPage from "../pageobjects/paymentPage.js";
import aboutPage from "../pageobjects/aboutPage.js";
import profilePage from "../pageobjects/profilePage.js";
const email = testData.login.email;
const password = testData.login.password;
let productTitle = "";
let quantityBefore = "";
let quantityAfter="";
describe(`Launch url and login to application`, function () {
    it(`Verify that the user is able to launch url`, async function () {
        await loginPage.launchUrl();
        await expect(browser).toHaveTitle('PlayGround')
    });
    it(`Login to the e-commerce by clicking on profile icon dropdown on top right side of the screen`, async function () {
            await loginPage.clickLogin(email,password);
          
    });
});
xdescribe(` TC001 - Verify user is able to filter product by brand`, function () {
    it("Navigate to 'Shop' page using menu option", async function () {
        await shopPage.productPage();
        await expect(shopPage.$heading()).withContext("the heading needed to be displayed").toHaveText("Products")
    });
    it(`Refine the listing of product by filtering the brands by selecting the desired brand name checkbox (e.g. Microsoft) in "Shop by Brand" shown on the left side of the page : ${testData.brands[3]}`, async function () {
        await shopPage.productPage();
        await shopPage.filterByBrand(testData.brands[3]);
        await expect(shopPage.$product(testData.brands[3])).toBeDisplayed();
    });

});
xdescribe(`TC002 - Verify pop up window is displayed`, function () {
    it(`Navigate to 'Component' page using menu option`, async function () {
        await componentsPage.componentsPage();
        await expect(componentsPage.$heading("Explore Components")).withContext("The heading needed to be displayed").toHaveText("Explore Components");
    });
    it(`Click in the 'Learn more' link on the 'Pop Window Component' tile`, async function () {
        await componentsPage.popWindowComponent();
        await expect(componentsPage.$button("Open Pop Window")).withContext("The 'Open Pop Window' should be displayed").toHaveText("Open Pop Window");
    });
    it(`Click on the 'Open Pop Window' button and verify the pop up window is opened`, async function () {
        await componentsPage.OpenPopWindowButton();
        await expect(componentsPage.$popWindow()).withContext("The pop up window  should be displayed").toHaveText("Pop Window Content");
    });
    it(`Click on the Close button and ensure the pop window is closed`, async function () {
        await componentsPage.closePopWindow();
        await expect(componentsPage.$button("Open Pop Window")).withContext("The 'Open Pop Window' should be displayed").toHaveText("Open Pop Window");
    });
});
xdescribe(`TC003 - Verify user is able to shop by category`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    })
    it(`Click on  'Shop by Category' menu and select a category(eg:select Mobiles):${testData.category[2]}`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[2];
        await homePage.chooseCategory(categories);
        await expect(homePage.$product(categories)).toBeDisplayed();
    });
});
xdescribe(`TC004 - Verify if the user is able to search the product using the search bar`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    })
    it(`In the home page, search for a product in the search bar:${testData.products}`, async function () {
        await homePage.searchBar(testData.products);
        await expect(homePage.$displayProduct("Dell XPS 13")).toBeDisplayed();


    });

});
xdescribe(`TC005 - Verify if the user is able to  click on Shop now option `, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });

    it(`In home page, click on shop now button for any product`, async function () {
        await homePage.clickShopNowButton();
        await expect(homePage.$heading()).withContext("The heading needed to be displayed").toHaveText("Products")

    });

});
xdescribe(`TC006 - Verify if the user is able to click on a product to buy`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
    it(`In home page, select the first product under 'New Arrivals'`, async function () {
        await homePage.clickFirstProduct();
        await expect(homePage.$heading()).toBeDisplayed();
    });
});
xdescribe(`TC007 - Verify if the user is able to add the product to the cart.`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
    it(`Click on any product:${testData.category[2]}`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[2];
        await homePage.chooseCategory(categories);
        await cartPage.clickOnProduct();
        await expect(cartPage.$description()).toBeDisplayed();
        const descriptionText = await cartPage.$description().getText();
        expect(descriptionText.trim().length).toBeGreaterThan(0);

    });
    it(`Click on 'Add To Cart' button`, async function () {
        await cartPage.clickOnAddToCart();
        await expect(cartPage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");
        
    });
});
xdescribe(`TC008 - Verify if the user can add multiple quantity of the same product to the cart`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
    it(`Click on any product:${testData.category[2]}`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[2];
        await homePage.chooseCategory(categories);
        await cartPage.clickOnProduct();
        await expect(cartPage.$description()).toBeDisplayed();
        productTitle = await cartPage.$productTitle().getText();
        const descriptionText = await cartPage.$description().getText();
        expect(descriptionText.trim().length).toBeGreaterThan(0);

    });
    it(`Click on 'Add To Cart' button`, async function () {

        await cartPage.clickOnAddToCart();

        await expect(cartPage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");

    });
   it(`Navigate to cart and add the required quantity by clicking the '+' button`, async function () {
    await cartPage.clickCartIcon();
    await expect(cartPage.$heading()).withContext("Heading check").toHaveText("Cart");

    const quantityBefore = parseInt(await cartPage.$quantityInput(productTitle).getText(), 10);
    await cartPage.addMultipleQuantity(productTitle);
    
    const quantityAfter = parseInt(await cartPage.$quantityInput(productTitle).getText(), 10);

    expect(quantityAfter).withContext("Quantity should increase after adding").toBeGreaterThan(quantityBefore);
});
});
xdescribe(`TC009 - Verify if the user can reduce quantity of the same product from the cart`, function () {
    it(`Reduce  the quantity of product by clicking the '-' button`, async function () {
        await cartPage.reducingQuantity(productTitle);
        const quantityAfter = parseInt(await cartPage.$quantityInput(productTitle).getText(), 10);
        console.log(quantityAfter);
      


    })
});
xdescribe(`TC010 - Verify if the user can add multiple product to the cart`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
    it(`Click on  product type1 and click 'Add to Cart'(eg:Laptops):${testData.category[1]}`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[1];
        await homePage.chooseCategory(categories);
        await homePage.clickAddToCart();
        await expect(homePage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");
    });
    it(`Click on  product type2 and click 'Add to Cart (eg:Mobiles):${testData.category[2]}'`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[2];
        await homePage.chooseCategory(categories);
        await homePage.clickAddToCart();
        await expect(homePage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");
    });
    it(`Verify that the product is displayed in the cart`, async function () {
        await cartPage.clickCartIcon();
        await expect(cartPage.$cartProduct("Dell XPS 13")).toBeDisplayed();
        await expect(cartPage.$cartProduct("iPhone 13 Pro")).toBeDisplayed();
        await browser.pause(1000);
    });
});
xdescribe(`TC011 - Verify if the user can reset the cart`, function () {
    it(`Click on 'Reset Cart' button`, async function () {
        await cartPage.clickingResetButton();
        await cartPage.$cartMessage("Your Cart feels lonely.").waitForDisplayed({ timeout: 10000, timeoutMsg: "The cart message has not been displayed" });
        await expect(cartPage.$cartMessage("Your Cart feels lonely.")).withContext("The message needed to be displayed").toHaveText("YOUR CART FEELS LONELY.");

    });

});
xdescribe(`TC013 - Verify the proceed to checkout button`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
    it(`Click on  product type1 and click 'Add to Cart'(eg:Laptops):${testData.category[1]}`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[1];
        await homePage.chooseCategory(categories);
        await cartPage.clickAddToCart();
        await expect(homePage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");
    });
    it(`Click on 'proceed to Checkout' button`, async function () {
        await cartPage.clickCartIcon();
        await cartPage.clickProceedToCheckOutButton();
        await expect(cartPage.$heading()).withContext("The heading needed to be displayed").toHaveText("Payment Gateway");

    });

});
xdescribe(`TC014 - Verify the Contact tab`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });

    it(`Navigate to the contact tab`, async function () {
        await contactPage.clickContactMenu();
        await expect(contactPage.$heading()).withContext("The heading needed to be displayed").toHaveText("Contact");
    });
    it(`Fill up the details -name, email and message`, async function () {
        await contactPage.fillDetails(testData.Name, testData.Email, testData.message);


    });
    it(`Submit the form by clicking on Post button`, async function () {
        await contactPage.clickPostButton();
        await expect(contactPage.$message()).withContext("The Thank you message needed to be displayed").toHaveText(`Thank you dear ${testData.Name}, Your messages has been received successfully. Further details will be sent to you by your email at ${testData.Email}.`)
    });
});
xdescribe(`TC015-Verify that a user is able to purchase and order_ETE flow`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
    it(`Navigate to Shop page using the menu option shown at top of the home page`, async function () {
        await shopPage.productPage();
        await expect(shopPage.$heading()).withContext("the heading needed to be displayed").toHaveText("Products")
    });
    it(`Select a category (e.g.: by clicking on checkbox for Mobiles) in "Shop by Category" filter section shown on the left side of the page:${testData.category[2]}`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[2];
        await homePage.chooseCategory(categories);

    });
    it(`Click on the image of the product to view the details (e.g.: Mobile)`, async function () {
        await cartPage.clickOnProduct();
        await expect(cartPage.$description()).toBeDisplayed();
        const descriptionText = await cartPage.$description().getText();
        expect(descriptionText.trim().length).toBeGreaterThan(0);
    });
    it(`Click on "Add to Cart" button`, async function () {
        await cartPage.clickOnAddToCart();
        await expect(homePage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");
    })
    it(`Click on "Cart" icon and navigate to the Cart page`, async function () {
        await cartPage.clickCartIcon();
        await expect(cartPage.$heading()).withContext("The heading needed to be displayed").toHaveText("Cart")
    })
    it(`Click on "Proceed to Checkout" button`, async function () {
        await cartPage.clickProceedToCheckOutButton();
        await expect(cartPage.$heading()).withContext("The heading needed to be displayed").toHaveText("Payment Gateway");

    })
    it(` In the Payment gateway page verify the 'Cash on Delivery' payment option`, async function () {
        await expect(cartPage.$checkBox()).toBeSelected();
        await expect(cartPage.$checkBox()).toBeDisabled();
    });
    it(` In the same page enter Fullname, Email, Address and Phone and click on 'Place Order' button`, async function () {
        await paymentPage.fillPaymentDetails(testData.Name, testData.Email, testData.address, testData.phone);
        await expect(cartPage.$successMessage()).withContext("The ordered placed message should be displayed").toHaveText("Your order has been placed successfully!");
    });
});
xdescribe(`TC016 - validate the subtotal amount`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
    it(`Click on  product type1 and click 'Add to Cart'(eg:Laptops):${testData.category[1]}`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[1];
        await homePage.chooseCategory(categories);
        await homePage.$addToCartButton().click();
        await expect(homePage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");
    });
    it(`Click on  product type2 and click 'Add to Cart (eg:Mobiles):${testData.category[2]}'`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[2];
        await homePage.chooseCategory(categories);
        await homePage.$addToCartButton().click();
        await expect(homePage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");
    });

    it(` Navigate to cart and click on proceed to checkout`, async function () {
        await cartPage.clickCartIcon();
        await expect(cartPage.$cartProduct("Dell XPS 13")).toBeDisplayed();
        await expect(cartPage.$cartProduct("iPhone 13 Pro")).toBeDisplayed();

        const { totalPrice, subtotal } = await cartPage.calculatingSubtotal();
        await expect(totalPrice).toBeCloseTo(subtotal, 2);
    });

});
xdescribe(`TC017- Verify the continue shopping button after resetting the cart`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });

    it(`Click on any product:${testData.category[2]}`, async function () {
        await homePage.clickOnShopByCategory();
        const categories = testData.category[2];
        await homePage.chooseCategory(categories);
        await cartPage.clickOnProduct();
       
    });
    it(`Click on 'Add To Cart' button`, async function () {

        await cartPage.clickOnAddToCart();

        await expect(cartPage.$toastMessage()).withContext("The message should be displayed").toHaveText("Added Succesfully!");
        
    });
    it(`Click on 'Reset Cart' button`, async function () {
        await cartPage.clickCartIcon();

        await cartPage.clickingResetButton();
        await cartPage.$cartMessage("Your Cart feels lonely.").waitForDisplayed({ timeout: 10000, timeoutMsg: "The cart message has not been displayed" });
        await expect(cartPage.$cartMessage("Your Cart feels lonely.")).withContext("The message needed to be displayed").toHaveText("YOUR CART FEELS LONELY.");

    });
    it(`Click on "Continue Shopping" button`, async function () {
        await cartPage.clickContinueShoppingButton();
        await expect(cartPage.$heading()).withContext("The heading needed to be displayed").toHaveText("Products");
    })
});
xdescribe(`TC018 - Verify the continue shopping button in about tab`, function () {
    it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
    it(`Navigate to about tab`, async function () {
        await aboutPage.aboutMenuBar();
        await expect(aboutPage.$heading()).withContext("The heading needed to be displayed").toHaveText("About");
    });
    it(`Click on 'Continue Shopping' button`, async function () {
        await aboutPage.clickContinueShoppingButton();
        await expect(aboutPage.$heading()).withContext("The heading needed to be displayed").toHaveText("Products")
    });


});
describe(`TC019 - Verify if the user is able to add the product to the wishlist`, function(){
    it(`Click on  "Shop by Category" menu and select a category:${testData.category[2]}`,async function(){
        await homePage.clickOnShopByCategory();
        await homePage.chooseCategory(testData.category[2]);
        await wishlistPage.addToWishList();
        await expect(wishlistPage.$heading()).toHaveText("iPhone 13 Pro")
        

       

    })
})

describe(`TC022 - Verify user is able to update their profile`,function(){
     it(`Navigate back to Home page`, async function () {
        await loginPage.navigateToHome();
        await expect(browser).toHaveTitle('PlayGround');
    });
 
    it(`Click on profile icon shown on the right side of the screen`,async function(){
        await profilePage.clickProfileMenuArrow();
        await profilePage.clickProfileMenu();
        await expect(profilePage.$profileHeading()).toHaveText('User Profile')
      
    })
    it(`Click on the edit button`,async function(){
        await profilePage.clickEditButton();
    })
    it(`Update full name, gender, country, bio and click on save button`,async function(){
        await profilePage.editDetails(testData.Name,testData.country,testData.bio);
        await profilePage.clickSaveButton();
        await expect(profilePage.$toastMessage()).withContext("The success message should be displayed").toHaveText("Successful!")

    })
});
describe(`TC023 - Verify user is able to logout`,function(){
    it(`Click on profile icon dropdown shown on the right side of the screen `,async function(){
       await profilePage.clickProfileMenuArrow();
       await expect(profilePage.$logOut()).toBeDisplayed();
    })
    it(` Click on Log Out button`,async function(){
        await profilePage.clickLogOut();
    })
    it(`Click on ok button to logout`,async function(){
        await profilePage.clickOkOnAlert();
        await expect(profilePage.$toastMessage()).withContext("The 'log out' message needed to be displayed").toHaveText("Logout Successful!");
      
    })

});



