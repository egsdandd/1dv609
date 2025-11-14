const BankAccount = require('../src/bankAccount');
const AccountHolder = require('../src/accountHolder');
const NotificationService = require('../src/notificationService');

describe('BankAccount', () => {
  describe('Initial state', () => {
    it('should initialize with zero balance', () => {
      // Arrange
      const holder = new AccountHolder('Dummy', 'dummy@example.com');
      const notifier = new NotificationService();
      const account = new BankAccount(holder, notifier);
      // Assert
      expect(account.getBalance()).toBe(0);
    });
  });

  describe('Deposit', () => {
    it('should increase balance after deposit', () => {
      // Arrange
      const holder = new AccountHolder('Dummy', 'dummy@example.com');
      const notifier = new NotificationService();
      const account = new BankAccount(holder, notifier);
      // Act
      account.deposit(100);
      // Assert
      expect(account.getBalance()).toBe(100);
    });

    it('should throw error when depositing negative amount', () => {
      // Arrange
      const holder = new AccountHolder('Dummy', 'dummy@example.com');
      const notifier = new NotificationService();
      const account = new BankAccount(holder, notifier);
      // Act
      const actDepositNegative = () => account.deposit(-50);
      // Assert
      expect(actDepositNegative).toThrow();
    });

    it('should record a transaction after deposit', () => {
      // Arrange
      const holder = new AccountHolder('Dummy', 'dummy@example.com');
      const notifier = new NotificationService();
      const account = new BankAccount(holder, notifier);
      // Act
      account.deposit(150);
      // Assert
      expect(account.getTransactionHistory().length).toBe(1);
      expect(account.getTransactionHistory()[0].amount).toBe(150);
      expect(account.getTransactionHistory()[0].type).toBe('deposit');
    });

    it('should decrease balance after withdrawal', () => {
      // Arrange
      const holder = new AccountHolder('Dummy', 'dummy@example.com');
      const notifier = new NotificationService();
      const account = new BankAccount(holder, notifier);
      account.deposit(200); // Starta med pengar på kontot
      // Act
      account.withdraw(50);
      // Assert
      expect(account.getBalance()).toBe(150);
    });


  });
});
