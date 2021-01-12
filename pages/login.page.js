import Page from './page';

class Login extends Page {
    constructor() {
        super()

        this.LOGIN_OVERLAY = '[data-testid=login_and_register]';
        this.LOGIN_HERE = '[data-testid=login_reg_switch_btn]';
        this.EMAIL_INPUT = 'input[name=email]';
        this.PASS_INPUT = 'input[name=password]';
        this.LOGIN_SBMT = 'button[type=submit]';
    }

    get loginOverlay() { return $(this.LOGIN_OVERLAY); }
    get loginBtn() { return $(this.LOGIN_HERE); }
    get enterEmail() { return $(this.EMAIL_INPUT); }
    get enterPass() { return $(this.PASS_INPUT); }
    get submitLogin() { return $(this.LOGIN_SBMT); }

    verifyLoginOverlay() {
        let val = false;
        if (this.loginOverlay.isExisting()) {
            val = true;
        }
        return val;
    }

    moveToLoginPage() {
        let val = false;
        if (this.loginBtn.isExisting()) {
            this.loginBtn.click();
            browser.pause(3000);
            val = true;
        }
        return val;
    }

    enterCreds(credential) {
        const userName = credential.split(':')[0];
        const password = credential.split(':')[1];
        this.enterEmail.setValue(userName);
        browser.pause(1000);
        this.enterPass.setValue(password);
        browser.pause(1000);
        this.submitLogin.click();
        browser.pause(2000);
        return true;
    }
}

export default new Login();