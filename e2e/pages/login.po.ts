import { browser, by, element } from 'protractor';
import { Page } from './app.po';

export class LoginPage extends Page {
    // todo: figure out why more than one element exists
    username = element(by.name('username'));
    password = element(by.name('password'));
    loginButton = element(by.buttonText('Continue'));
    signInButton = element(by.buttonText('Sign in'));
    // logoutButton = element(by.id('logout'));
    header = element.all(by.css('ion-title')).get(1);

    getHeader() {
        return this.header.getText();
    }

    setUserName(username) {
        this.username.sendKeys(username);
    }

    getUserName() {
        return this.username.getAttribute('value');
    }

    clearUserName() {
        this.username.clear();
    }

    setPassword(password) {
        this.password.sendKeys(password);
    }

    getPassword() {
        return this.password.getAttribute('value');
    }

    clearPassword() {
        this.password.clear();
    }

    login(username: string, password: string) {
        this.signInButton.click();
        this.setUserName(username);
        this.setPassword(password);
        browser.driver.sleep(500);
        this.loginButton.click();
    }

    // logout() {
    //     return this.logoutButton.click();
    // }
}
