import { Pipe, PipeTransform } from '@angular/core';
import * as deJson from './../translations/de.json';
import * as enJson from './../translations/en.json';
import { UserDataService } from '../services/user-data.service';

@Pipe({
  name: 'i18n'
})
export class I18nPipe implements PipeTransform {
  constructor(private userDataService: UserDataService) {}

  transform(value: string): string {
    const language = this.userDataService.getUserSettings().language;
    const dictionary = this.getDictionary(language);
    const translation = dictionary[value];

    if (!translation) {
      console.error('no translation for given key:', value);
    }
    return translation;
  }

  private getDictionary(lang: string): Record<string, string> {
    switch(lang) {
      case 'en': return enJson;
      case 'de': return deJson;
      default: return {};
    }
  }
}
