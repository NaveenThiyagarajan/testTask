import Page from './page';

class HomeScreen extends Page {
    constructor() {
        super();

        this.ACCEPT_COOKIES = '#onetrust-accept-btn-handler';
        this.SEARCH_ICON = 'div[role="search"]';
        this.SEARCH_BAR_INPUT = 'input[type="search"]'
        this.PRODUCT_HEADER = '[class|=ListingPageElements__MainContent] h1';
        this.PRODUCT_LIST = '[class|=ListingPageElements__MainContent] [data-testid=generic-product]';
        this.WISHLIST_ICON = '[class|=WishlistIcon__StyledWishlistIconWrapper]';
        this.WISHLIST_ICON_COUNTER = '[data-testid=wishlist-counter]';
        this.keyword = '';
    }

    get acceptCookiesBtn() { return $(this.ACCEPT_COOKIES); }
    get searchIconBtn() { return $(this.SEARCH_ICON); }
    get searchBarInput() { return $(this.SEARCH_BAR_INPUT); }
    get productHeader() { return $(this.PRODUCT_HEADER); }
    get productList() { return $$(this.PRODUCT_LIST); }
    get wishlistCounter() { return $(this.WISHLIST_ICON_COUNTER); }

    /**
     * Home page functions
     */

    acceptCookies() {
        try {
            browser.waitUntil(() => {
                if ($$(this.ACCEPT_COOKIES).length > 0) {
                    return true;
                }
            });
            return this.clickButton(this.acceptCookiesBtn);
        } catch(e) {
            return true;
        }
    }

    clickSearchIcon() {
        return this.clickButton(this.searchIconBtn);
    }

    keywordSearch(keyword) {
        this.keyword = keyword;
        if (this.searchBarInput.isExisting()) {
            console.log('Before setValue');
            browser.pause(5000);
            this.searchBarInput.setValue(keyword);
            browser.pause(5000);
            console.log('Before click on input bar');
            this.searchBarInput.click();
            browser.pause(5000);
            console.log('Clicked on the search ICON');
            browser.keys('Enter');
            console.log('Clicked on the ENTER ICON');
        }
        browser.pause(10000);
    }

    verifyProductListing() {
        let val = true;
        console.log(`Verifying the keyword: ${this.keyword}`);
        const header = this.productHeader.getText();
        if (!header || header.toLowerCase() !== this.keyword.toLowerCase()) {
            console.log('Title not matching: ' + this.productHeader.getText());
            val = false;
        }
        if (this.productList.length === 0) {  
            val = false;
        }
        console.log('Product list length: ' + this.productList.length);
        browser.pause(5000);
        return val;
    }

    clickWishlistIcon() {
        if (this.productList.length > 0) {
            this.productList[0].$(this.WISHLIST_ICON).click();
        } else {
            console.error('There are no products to click on the wishlist icon');
        }
        browser.pause(5000);
    }

    verifyWishlistCounter() {
        let val = true;
        if (this.productList[0].$(this.WISHLIST_ICON).isExisting()) {
            const wishlistIconElement = this.productList[0].$(this.WISHLIST_ICON + ' svg');
            const filedValue = wishlistIconElement.getAttribute('data-filled');
            console.log('Is icon filed: ' + filedValue);
            if (filedValue !== 'true') {
                val = false;
            }
        }
        if (val && this.wishlistCounter.isExisting()) {
            const counter = this.wishlistCounter.getText();
            if (counter === '1') {
                console.log('Product added to wishlist.')
            }
        } else {
            val = false;
            console.error('There are no products to added on the wishlist icon');
        }
    }

    moveToWishlistPage() {
        this.wishlistCounter.click();
    }
}

export default new HomeScreen();