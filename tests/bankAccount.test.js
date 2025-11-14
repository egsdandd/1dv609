const BankAccount = require('../src/bankAccount');
const AccountHolder = require('../src/accountHolder');
const NotificationService = require('../src/notificationService');

let holder, notifier, account;

beforeEach(() => {
  holder = new AccountHolder('Dummy', 'dummy@example.com');
  notifier = new NotificationService();
  account = new BankAccount(holder, notifier);
});

describe('BankAccount', () => {
  describe('Initial state', () => {
    it('should initialize with zero balance', () => {
      expect(account.getBalance()).toBe(0);
    });
  });

  describe('Deposit', () => {
    it('should increase balance after deposit', () => {
      account.deposit(100);
      expect(account.getBalance()).toBe(100);
    });

    it('should throw error when depositing negative amount', () => {
      expect(() => account.deposit(-50)).toThrow();
    });

    it('should record a transaction after deposit', () => {
      account.deposit(150);
      expect(account.getTransactionHistory().length).toBe(1);
      expect(account.getTransactionHistory()[0].amount).toBe(150);
      expect(account.getTransactionHistory()[0].type).toBe('deposit');
    });

  });  
  
  describe('Deposit large amount', () => {
    it('should notify for large deposits', () => {
      const notifySpy = jest.spyOn(notifier, 'notify');
      account.deposit(15000);
      expect(notifySpy).toHaveBeenCalledWith('Large deposit: 15000 SEK');
    });
  });

  describe('Withdraw', () => {
    it('should decrease balance after withdrawal', () => {
      account.deposit(200);
      account.withdraw(50);
      expect(account.getBalance()).toBe(150);
    });
  });
});