const Transaction = require('./transaction');

class BankAccount {
  #accountHolder;
  #notificationService;
  #transactions = [];
  #balance = 0;

  constructor(accountHolder, notificationService) {
    this.#accountHolder = accountHolder;
    this.#notificationService = notificationService;
  }

  get accountHolder() {
    return this.#accountHolder;
  }

  deposit(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount. The deposit amount must be a positive number.');
    }
    this.#balance += amount;
    const tx = new Transaction(amount, 'deposit');
    this.#transactions.push(tx);
    if (amount > 10000 && this.#notificationService) {
      this.#notificationService.notify(`Large deposit: ${amount} SEK`);
    }
  }

  withdraw(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error('Invalid amount. The withdrawal amount must be a positive number.');
    }
    if (this.#balance < amount) {
      throw new Error('Insufficient funds.');
    }
    this.#balance -= amount;
    const tx = new Transaction(amount, 'withdraw');
    this.#transactions.push(tx);
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }

  getTransactionHistory() {
    return [...this.#transactions]; // returerar en kopia för kapsling
  }
}

module.exports = BankAccount;
