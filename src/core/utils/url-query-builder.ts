import { isNotEmpty } from 'class-validator';

export class UrlQueryBuilder {
  private queryUrl: string;
  private readonly queryUrlDefaultValue = '?';

  constructor() {
    this.queryUrl = this.queryUrlDefaultValue;
  }

  toString(): string {
    return this.queryUrl !== this.queryUrlDefaultValue ? this.queryUrl : '';
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
    if (this.queryUrl !== this.queryUrlDefaultValue) {
      this.queryUrl += '&';
    }
    return this;
  }
}
