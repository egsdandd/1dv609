const AccountHolder = require('../src/accountHolder');

describe('AccountHolder', () => {
  it('should create an instance with name and email', () => {
    const holder = new AccountHolder('Alice', 'alice@example.com');
    expect(holder.name).toBe('Alice');
    expect(holder.email).toBe('alice@example.com');
  });

  it('should throw error if name is missing', () => {
    expect(() => new AccountHolder('', 'test@example.com')).toThrow();
  });

  it('should throw error if email is missing', () => {
    expect(() => new AccountHolder('User', '')).toThrow();
  });

  it('should have a valid email format', () => {
    expect(() => new AccountHolder('User', 'invalid-email')).toThrow();
  });
});
