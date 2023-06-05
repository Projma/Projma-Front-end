import {
  convertNumberToPersian,
  convertNumberToEnglish,
  isPersianNumber,
  formatPrice,
} from './helpers';

describe('helpers', () => {
  describe('convertNumberToPersian', () => {
    it('converts numbers to Persian correctly', () => {
      expect(convertNumberToPersian(123)).toBe('۱۲۳');
      expect(convertNumberToPersian('123')).toBe('۱۲۳');
    });
  });

  describe('convertNumberToEnglish', () => {
    it('converts numbers to English correctly', () => {
      expect(convertNumberToEnglish('۱۲۳')).toBe('123');
    });
  });

  describe('isPersianNumber', () => {
    it('returns true for Persian numbers', () => {
      expect(isPersianNumber('۱۲۳')).toBe(true);
    });

    it('returns false for non-Persian numbers', () => {
      expect(isPersianNumber(123)).toBe(false);
      expect(isPersianNumber('123')).toBe(false);
    });
  });

  describe('formatPrice', () => {
    it('formats prices correctly', () => {
      expect(formatPrice(1000)).toBe('1,000');
      expect(formatPrice(1000000)).toBe('1,000,000');
    });
  });
});
