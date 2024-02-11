// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

let bankAccount: BankAccount;
const initialBalance = 1234;

beforeEach(() => (bankAccount = getBankAccount(initialBalance)));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(1235)).toThrow(
      new InsufficientFundsError(bankAccount.getBalance()),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const destAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.transfer(1235, destAccount)).toThrow(
      new InsufficientFundsError(destAccount.getBalance()),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(1235, bankAccount)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const deposit = 1245;
    expect(bankAccount.deposit(deposit).getBalance()).toBe(
      initialBalance + deposit,
    );
    expect(bankAccount.deposit(deposit).getBalance()).toBe(
      initialBalance + deposit + deposit,
    );
  });

  test('should withdraw money', () => {
    const withdraw = 134;
    expect(bankAccount.withdraw(withdraw).getBalance()).toBe(
      initialBalance - withdraw,
    );
    expect(bankAccount.withdraw(withdraw).getBalance()).toBe(
      initialBalance - withdraw - withdraw,
    );
  });

  test('should transfer money', () => {
    const transfer = 500;
    const destAccount = getBankAccount(initialBalance);

    expect(bankAccount.transfer(transfer, destAccount).getBalance()).toBe(
      initialBalance - transfer,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(55);
    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(55);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(221);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(221);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
