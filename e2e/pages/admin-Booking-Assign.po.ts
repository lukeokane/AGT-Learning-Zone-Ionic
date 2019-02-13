import { browser,element,by } from 'protractor';
import { Page } from './app.po';

export class AdmingBookingAssignP extends Page {
assignButton = element(by.buttonText('Assign'));
// list = element.all(by.css('.outline'));

  navigateTo(destination) {
    return browser.get(destination);
  }


}