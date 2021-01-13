import { Given, When, Then, After, Status } from 'cucumber';
import { expect } from 'chai';
import Page from './../pages/page';
import homeScreen from './../pages/homescreen.page';
import login from './../pages/login.page';
import wishlist from './../pages/wishlist.page';


Given(/^I am on the WestwingNow home page$/, () => {
    new Page().open('/');
    browser.pause(2000);
});

When(/^I search for "([^"]*)"$/, (keyword) => {
    expect(homeScreen.acceptCookies(),'Failed to click on the accept cookies button').to.be.true;
    expect(homeScreen.keywordSearch(keyword),'Failed to search with the keyword').to.be.true; 
});

Then(/^I should see product listing page with a list of products$/, () => {
    const val = homeScreen.verifyProductListing();
    console.log('Result of verification: ' + val);
    expect(val,'No product listed for the searched keyword').to.be.true; 
});

When(/^I click on wishlist icon of the first found product$/, () => {
    expect(homeScreen.clickWishlistIcon(),'Failed to click the wishlist icon').to.be.true; 
});

Then(/^I should see the login\/registration overlay$/, () => {
    
    expect(login.verifyLoginOverlay(),'Failed to verify login overlay page').to.be.true; 
});

When(/^I switch to login form of the overlay$/, () => {
    expect(login.moveToLoginPage(),'Failed to move to login page').to.be.true; 
});

When(/^I log in with "([^"]*)" credentials$/, (credential) => {
    expect(login.enterCreds(credential),'Failed to enter the creds').to.be.true; 
});

Then(/^the product should be added to the wishlist$/, () => {
    expect(homeScreen.verifyWishlistCounter(),'Failed to click the wishlist icon').to.be.true; 
});

Then(/^I go to the wishlist page$/, () => {
    homeScreen.moveToWishlistPage();
    expect(wishlist.verifyWishlistPageLoaded(),'Failed to load the wishlist page with products').to.be.true; 
});

Then(/^I delete the product from my wishlist$/, () => { 
    expect(wishlist.removeItem(),'Failed to remove the favorite product').to.be.true; 
    browser.pause(2000);
});

After((scenario) => {
    if (Status.FAILED === scenario.result.status) {
        browser.takeScreenshot();
        console.log('Scenario Failed. Screenshot taken');
    }
});