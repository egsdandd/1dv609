const Transaction = require('./transaction');

class BankAccount {
  constructor(accountHolder, notificationService) {
    this.accountHolder = accountHolder;
    this.notificationService = notificationService;
    this.transactions = [];
    this.balance = 0;
  }

  deposit(amount) {
    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount. The deposit amount must be a positive number.');
    }
    // Update balance
    this.balance += amount;
    // Log transaction
    const tx = new Transaction(amount, 'deposit');
    this.transactions.push(tx);
    // Optionally notify for large deposits
    if (amount > 10000 && this.notificationService) {
      this.notificationService.notify(`Large deposit: ${amount} SEK`);
    }
  }

  withdraw(amount) {
    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount. The withdrawal amount must be a positive number.');
    }
    // Check sufficient balance
    if (this.balance < amount) {
      throw new Error('Insufficient funds.');
    }
    // Update balance
    this.balance -= amount;
    // Log transaction
    const tx = new Transaction(amount, 'withdraw');
    this.transactions.push(tx);
    return this.balance;
  }

  getBalance() {
    return this.balance;
  }

  getTransactionHistory() {
    return this.transactions;
  }
}
module.exports = BankAccount;
