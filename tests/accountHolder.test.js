const AccountHolder = require('../src/accountHolder');

describe('AccountHolder', () => {
  let holder;

  describe('Initialization', () => {
    it('creates an instance with trimmed name and email', () => {
      holder = new AccountHolder('  Alice  ', '  alice@example.com  ');
      expect(holder.name).toBe('Alice');
      expect(holder.email).toBe('alice@example.com');
    });

    it.each([
      ['', 'test@example.com', 'Name is required'],
      ['User', '', 'Valid email is required'],
      ['User', 'invalid-email', 'Valid email is required'],
    ])('throws error with name: "%s" and email: "%s"', (name, email, expectedError) => {
      expect(() => new AccountHolder(name, email)).toThrow(expectedError);
    });
  });

  describe('Updates', () => {
    beforeEach(() => {
      holder = new AccountHolder('Alice', 'alice@example.com');
    });

    it('updates name and trims whitespace', () => {
      holder.setName('  Bob  ');
      expect(holder.name).toBe('Bob');
    });

    it('throws error when updating name to invalid', () => {
      expect(() => holder.setName('')).toThrow('Name is required');
    });

    it('updates email and trims whitespace', () => {
      holder.setEmail('  bob@example.com  ');
      expect(holder.email).toBe('bob@example.com');
    });

    it('throws error when updating email to invalid', () => {
      expect(() => holder.setEmail('not-an-email')).toThrow('Valid email is required');
    });
  });

  describe('Edge cases', () => {
    it('handles names with special characters', () => {
      holder = new AccountHolder("O'Connor", 'o.connor@example.com');
      expect(holder.name).toBe("O'Connor");
      expect(holder.email).toBe('o.connor@example.com');
    });
  });
});
