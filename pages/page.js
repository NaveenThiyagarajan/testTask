export default class Page {

    open(path) {
        browser.setWindowSize(1500, 950);
        browser.url(path);
    }

    clickButton(webElement) {
        if (webElement.isExisting()) {
            webElement.click();
            return true;
        } else {
            return false;
        }
    }

}