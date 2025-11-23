const BankAccount = require('../src/bankAccount');
const AccountHolder = require('../src/accountHolder');
const NotificationServiceMock = require('./__mocks__/notificationService.mock');

let holder, notifier, account;

beforeEach(() => {
  // Arrange (gäller hela testsuiten)
  holder = new AccountHolder('Dummy', 'dummy@example.com');
  notifier = new NotificationServiceMock();
  account = new BankAccount(holder, notifier);
});

describe('BankAccount', () => {
  describe('Initial state', () => {
    it('should initialize with zero balance', () => {
      // Arrange: (klart i beforeEach)
      // Act:
      const balance = account.getBalance();
      // Assert:
      expect(balance).toBe(0);
    });
  });

  describe('Deposit', () => {
    it('should increase balance after deposit', () => {
      // Arrange: (klart i beforeEach)
      // Act:
      account.deposit(100);
      // Assert:
      expect(account.getBalance()).toBe(100);
    });

    it('should throw error when depositing negative amount', () => {
      // Arrange: (klart i beforeEach)
      // Act & Assert:
      expect(() => account.deposit(-50)).toThrow('Invalid amount. The deposit amount must be a positive number.');
    });

    it('should record a transaction after deposit', () => {
      // Arrange: (klart i beforeEach)
      // Act:
      account.deposit(150);
      const history = account.getTransactionHistory();
      // Assert:
      expect(history.length).toBe(1);
      expect(history[0].amount).toBe(150);
      expect(history[0].type).toBe('deposit');
    });
  });

  describe('Deposit large amount', () => {
    it('should notify for large deposits', () => {
      // Arrange:
      const notifySpy = jest.spyOn(notifier, 'notify');
      // Act:
      account.deposit(15000);
      // Assert:
      expect(notifySpy).toHaveBeenCalledWith('Large deposit: 15000 SEK');
      notifySpy.mockRestore();
    });
  });

  describe('Withdraw', () => {
    it('should decrease balance after withdrawal', () => {
      // Arrange:
      account.deposit(200);
      // Act:
      account.withdraw(50);
      // Assert:
      expect(account.getBalance()).toBe(150);
    });
  });

  describe('Withdraw invalid amounts', () => {
    it('should throw error if withdrawn amount is zero', () => {
      // Arrange: (klart i beforeEach)
      // Act & Assert:
      expect(() => account.withdraw(0)).toThrow('Invalid amount. The withdrawal amount must be a positive number.');
    });
    it('should throw error if withdrawn amount is negative', () => {
      // Arrange:
      // Act & Assert:
      expect(() => account.withdraw(-50)).toThrow('Invalid amount. The withdrawal amount must be a positive number.');
    });
    it('should throw error if withdrawn amount is not a number', () => {
      // Arrange: (klart i beforeEach)
      // Act & Assert:
      expect(() => account.withdraw('hundra')).toThrow('Invalid amount. The withdrawal amount must be a positive number.');
    });
  });
});
