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
describe('AccountHolder updates', () => {
  it('should update the email address', () => {
    const holder = new AccountHolder('Alice', 'alice@example.com');
    holder.email = 'newalice@example.com';
    expect(holder.email).toBe('newalice@example.com');
  });
});
describe('AccountHolder edge cases', () => {
  it('should trim whitespace from name and email', () => {
    const holder = new AccountHolder('  Bob  ', '  bob@example.com  ');
    expect(holder.name).toBe('Bob');
    expect(holder.email).toBe('bob@example.com');
  });
  it('should handle names with special characters', () => {
    const holder = new AccountHolder("O'Connor", 'o.connor@example.com');
    expect(holder.name).toBe("O'Connor");
    expect(holder.email).toBe('o.connor@example.com');
  });
});
