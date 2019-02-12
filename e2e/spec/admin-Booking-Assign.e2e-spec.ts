import { AdmingBookingAssignP } from './../pages/admin-Booking-Assign.po';
import { browser } from 'protractor';

describe('AdmingBookingAssignPage', () => {
  let adminBookingAssignPage;

  beforeEach(() => {
    adminBookingAssignPage = new AdmingBookingAssignP();
    adminBookingAssignPage.navigateTo('/#/admin-booking-assign');
    browser.waitForAngular();
  });

  
  it('should show an Assign Tutor button', () => {
    expect(adminBookingAssignPage.assignButton.isPresent());
});

  
it('should show page being scrolled up', () => {
  browser.executeScript('window.scrollTo(0,0);').then(function() {
    browser.sleep(3000);
  })
});

it('should show page being scrolled down', () => {
  browser.executeScript('window.scrollTo(0,500);').then(function() {
    browser.sleep(3000);
  })
});


// it('Total Items Per Page should be 8', () => {
//   expect(adminBookingAssignPage.list.count()).toBe(8);
// });

});