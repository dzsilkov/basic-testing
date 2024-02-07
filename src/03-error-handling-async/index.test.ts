// Uncomment the code below and write your tests
import {throwError, throwCustomError, resolveValue, rejectCustomError, MyAwesomeError} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue('async data')).toBe('async data');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('throw Error message')).toThrow('throw Error message');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(new MyAwesomeError());
    expect(() => throwCustomError()).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(() => rejectCustomError()).rejects.toThrow(new MyAwesomeError())
    await expect(() => rejectCustomError()).rejects.toThrow('This is my awesome custom error!')
  });
});
