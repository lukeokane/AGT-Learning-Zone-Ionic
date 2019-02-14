import { browser, protractor } from 'protractor';
import { UserHomeP } from '../pages/user-home.po';

describe('UserHomePage', () => {
    let UserHomePage;

    beforeEach(() => {
        UserHomePage = new UserHomeP();
        UserHomePage.navigateTo('/#/user-home');
        browser.waitForAngular();
    });

    it('should show the calendar for user', () => {
        expect(UserHomePage.userCalendar.isPresent());
    });
    it('should click a slot and display modal to request tutorial', () => {
        const firstSlot = UserHomePage.getSlotButton().get(0);
        firstSlot.click();
        expect(UserHomePage.getRequestModal().isDisplayed()).toBeTruthy();
    
    });



});