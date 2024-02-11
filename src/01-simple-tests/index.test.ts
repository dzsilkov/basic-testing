// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 8, action: Action.Add })).toBe(10);
    expect(simpleCalculator({ a: 2, b: 8, action: Action.Add })).not.toBe(9);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 8, action: Action.Subtract })).toBe(-6);
    expect(simpleCalculator({ a: 2, b: 8, action: Action.Subtract })).not.toBe(
      10,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 25, b: 5, action: Action.Multiply })).toBe(
      125,
    );
    expect(simpleCalculator({ a: 25, b: 5, action: Action.Multiply })).not.toBe(
      30,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 25, b: 5, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 25, b: 1, action: Action.Divide })).not.toBe(
      5,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 8, b: 4, action: Action.Exponentiate })).toBe(
      4096,
    );
    expect(
      simpleCalculator({ a: 8, b: 2, action: Action.Exponentiate }),
    ).not.toBe(63);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 8, action: 'action' })).toBeNull();
    expect(simpleCalculator({ a: 2, b: 8, action: '6' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '8', b: 8, action: Action.Add })).toBeNull();
    expect(
      simpleCalculator({ a: 8, b: '76', action: Action.Multiply }),
    ).toBeNull();
  });
});
