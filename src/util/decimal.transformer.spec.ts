import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/util/DecimalTransformer';

describe('DecimalTransformer', () => {
  const format: DecimalTransformer = new DecimalTransformer();

  describe('to', () => {
    it('should return null when value is null', () => {
      expect(format.to(null)).toBeUndefined();
    });

    it('should transform Decimal to string, successfully', () => {
      const value = new Decimal('3000.1');
      const result = format.to(value);
      expect(result).toBe('3000.1');
    });
  });

  describe('from', () => {
    it('should return null when value is null', () => {
      expect(format.from()).toBeNull();
    });

    it('should transform string to Decimal, successfully', () => {
      const result = format.from('3000.1');
      expect(typeof result).toEqual('object');
    });
  });

  describe('sum', () => {
    it('should return sum of values, successfully', () => {
      const other = new Decimal('3000.1');
      const result = format.sum(other, '3000.1');
      const value = format.to(result);

      expect(value).toBe('6000.2');
      expect(typeof value).toBe('string');
    });
  });

  describe('sub', () => {
    it('should return sub of values, successfully', () => {
      const other = new Decimal('3000.1');
      const result = format.sub(other, '3000.1');
      const value = format.to(result);

      expect(value).toBe('0');
      expect(typeof value).toBe('string');
    });
  });
});
