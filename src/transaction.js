class Transaction {
  constructor(amount, type, date = new Date()) {
    this.amount = amount;
    this.type = type; // 'deposit' eller 'withdraw'
    this.date = date;
  }
}
module.exports = Transaction;
