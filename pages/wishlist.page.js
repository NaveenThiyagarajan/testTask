import Page from './page';

class Wishlist extends Page {
    constructor() {
        super();

        this.WISHLIST_PAGE = '.wishlistContainers';
        this.WISHLIST_PRODUCTS = '.wishlistContainer .listProductsWrapper .listProducts li';
        this.WISHLIST_REMOVE = '.blockListProduct__delete';
        this.WISHLIST_NO_PRODUCT = '.wishlistNoProducts__info';
    }

    get wishListPage() { return $(this.WISHLIST_PAGE); }
    get wishListProducts() { return $$(this.WISHLIST_PRODUCTS); }
    get wishListRmvIcon() { return $(this.WISHLIST_REMOVE); }
    get wishListNoProduct() { return $(this.WISHLIST_NO_PRODUCT); }

    verifyWishlistPageLoaded() {
        if (this.wishListPage.isDisplayedInViewport()) {
            console.log('User is on the WishlistPage.')
            return true;
        } else {
            console.error('Failed to load wishlist page');
            return false;
        }
    }

    removeItem() {
        const wishListProducts = this.wishListProducts;
        try {
            browser.waitUntil(() => wishListProducts.length);
            if ( wishListProducts.length > 0) {
                console.log('Total Number of products on the wishlist page: ' + wishListProducts.length);
                if (wishListProducts[0].$(this.WISHLIST_REMOVE).isExisting()) {
                    wishListProducts[0].$(this.WISHLIST_REMOVE).click();
                    // console.log('Removed the first product from the wishlist page');
                    browser.pause(2000);
                    if (this.wishListNoProduct.isDisplayedInViewport()) {
                        console.log('Removed the first product from the wishlist page');
                        return true;
                    }
                } else {
                    console.error('there is no X in the wishlist page to remove.');
                    return false;
                }
            } else {
                console.error('there are no items in the wishlist page to remove.');
                return false;
            }
        } catch (error) {
            return false;
        }
    }
}

export default new Wishlist();