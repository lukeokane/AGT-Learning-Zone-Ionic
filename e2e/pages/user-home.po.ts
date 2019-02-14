import { browser, element, by, ElementFinder } from 'protractor';
import { Page } from './app.po';

export class UserHomeP extends Page {
    userCalendar = element(by.id("user-calendar"));

    navigateTo(destination) {
        return browser.get(destination);
    }

    getTitle() {
        return browser.getTitle();
    }
    getHomePageTag() {
        return element(by.tagName('home-page'));
    }
    getSlotButton() {
        return element.all(by.css('.tg-slot'));
    }
    getRequestModal(): ElementFinder {
        return element(by.tagName('user-request-modal'));
    }

}