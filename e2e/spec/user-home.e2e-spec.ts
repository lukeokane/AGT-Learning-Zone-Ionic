import { browser, protractor } from 'protractor';
import { UserHomeP } from '../pages/user-home.po';

describe('AdmingBookingManagementPage', () => {
    let UserHomePage;

    beforeEach(() => {
        UserHomePage = new UserHomeP();
        UserHomePage.navigateTo('/#/user-home');
        browser.waitForAngular();
    });

    it('should show the calendar for user', () => {
        expect(UserHomePage.userCalendar.isPresent());
    });


});