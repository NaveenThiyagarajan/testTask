import { Given, When, Then } from 'cucumber';
import Page from './../pages/page';
import homeScreen from './../pages/homescreen.page';
import login from './../pages/login.page';
import wishlist from './../pages/wishlist.page';


Given(/^I am on the WestwingNow home page$/, () => {
    new Page().open('/');
    browser.pause(2000);
});

When(/^I search for "([^"]*)"$/, (keyword) => {
    homeScreen.acceptCookies();
    homeScreen.keywordSearch(keyword);
});

Then(/^I should see product listing page with a list of products$/, () => {
    const val = homeScreen.verifyProductListing();
    console.log('Result of verification: ' + val);
});

When(/^I click on wishlist icon of the first found product$/, () => {
    homeScreen.clickWishlistIcon();
});

Then(/^I should see the login\/registration overlay$/, () => {
    login.verifyLoginOverlay();
});

When(/^I switch to login form of the overlay$/, () => {
    login.moveToLoginPage();
});

When(/^I log in with "([^"]*)" credentials$/, (credential) => {
    login.enterCreds();
});

Then(/^the product should be added to the wishlist$/, () => {
    homeScreen.verifyWishlistCounter();
});

Then(/^I go to the wishlist page$/, () => {
    homeScreen.moveToWishlistPage();
    wishlist.verifyWishlistPageLoaded();
});

Then(/^I delete the product from my wishlist$/, () => {
    wishlist.removeItem();
    browser.pause(5000);
});