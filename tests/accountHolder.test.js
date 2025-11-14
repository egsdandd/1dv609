const AccountHolder = require('../src/accountHolder');

describe('AccountHolder', () => {
  it('should store name and email', () => {
    const holder = new AccountHolder('Dummy', 'dummy@example.com');
    expect(holder.name).toBe('Dummy');
    expect(holder.email).toBe('dummy@example.com');
  });
});
