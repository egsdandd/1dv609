const BankAccount = require('../src/bankAccount');
const AccountHolder = require('../src/accountHolder');
const NotificationService = require('../src/notificationService');

describe('BankAccount', () => {
  it('should initialize with zero balance', () => {
    const holder = new AccountHolder('Dummy', 'dummy@example.com');
    const notifier = new NotificationService();
    const account = new BankAccount(holder, notifier);
    expect(account.getBalance()).toBe(0);
  });
});
