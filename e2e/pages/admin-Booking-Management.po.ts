import { browser,element,by } from 'protractor';
import { Page } from './app.po';

export class AdmingBookingManagementP extends Page {
  assignButton = element(by.buttonText('Assign'));

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }
}