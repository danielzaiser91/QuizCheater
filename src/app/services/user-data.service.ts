import { Injectable } from '@angular/core';
import { UserSettings } from '../interfaces/UserSettings.api';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor() {}

  getUserSettings() {
    const defaultSettings = this.getDefaultSettings();
    const customSettings = localStorage.getItem('userSettings');

    let custom = {};
    if (customSettings) {
      try {
        const parsed = JSON.parse(customSettings);
        if (this.isValidSettings(parsed)) {
          custom = parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }

    const userSettings = Object.assign({}, defaultSettings, custom);
    return userSettings;
  }

  getDefaultSettings(): UserSettings {
    return {
      language: 'en'
    }
  }

  private isValidSettings(settings: UserSettings) {
    if (typeof settings.language !== 'string') {
      return false;
    }
    return true;
  }
}
