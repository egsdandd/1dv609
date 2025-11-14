class BankAccount {
  constructor(accountHolder, notificationService) {
    this.accountHolder = accountHolder;
    this.notificationService = notificationService;
    this.transactions = [];
    this.balance = 0;
  }
  deposit(amount) {
    // TODO: Lägg till deposit-logik och kalla notificationService om behov
    this.balance += amount
  }
  withdraw(amount) {
    // TODO: Lägg till withdraw-logik och kalla notificationService om behov
  }
  getBalance() {
    return this.balance;
  }
  getTransactionHistory() {
    return this.transactions;
  }
}
module.exports = BankAccount;
