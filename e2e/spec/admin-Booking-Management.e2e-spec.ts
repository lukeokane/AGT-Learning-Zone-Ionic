import { AdmingBookingManagementP } from './../pages/admin-Booking-Management.po';
import { browser, protractor } from 'protractor';

describe('AdmingBookingManagementPage', () => {
  let admingBookingManagementPage;

  beforeEach(() => {
    admingBookingManagementPage = new AdmingBookingManagementP();
    admingBookingManagementPage.navigateTo('/#/admin-booking-management');
    browser.waitForAngular();
  });

  it('should show an Assign button', () => {
    expect(admingBookingManagementPage.assignButton.isPresent());
});

 
});