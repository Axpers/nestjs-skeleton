import { isNotEmpty } from 'class-validator';

export class UrlQueryBuilder {
  private queryUrl: string;

  constructor() {
    this.queryUrl = '?';
  }

  toString(): string {
    return this.queryUrl !== '?' ? this.queryUrl : '';
  }

  addIfValid(key: string, value: string | number | boolean): this {
    if (isNotEmpty(key) && isNotEmpty(value)) {
      return this.add(key, value);
    }
    return this;
  }

  private add(key: string, value: string | number | boolean): this {
    this.addStartOfQueryParam();
    this.queryUrl += `${key}=${value}`;
    return this;
  }

  private addStartOfQueryParam(): this {
    if (this.queryUrl !== '?') {
      this.queryUrl += '&';
    }
    return this;
  }
}
