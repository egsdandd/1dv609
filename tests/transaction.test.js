const Transaction = require('../src/transaction');

describe('Transaction', () => {
  it('should create a transaction with correct amount and type', () => {
    const t = new Transaction(100, 'deposit');
    expect(t.amount).toBe(100);
    expect(t.type).toBe('deposit');
  });
});
