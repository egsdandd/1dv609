const AccountHolder = require('../src/accountHolder');

describe('AccountHolder', () => {
  let holder;

  describe('Initialization', () => {
    it('skapar instans och trimmar namn och email', () => {
      // Arrange
      const nameRaw = '  Alice  ';
      const emailRaw = '  alice@example.com  ';
      // Act
      holder = new AccountHolder(nameRaw, emailRaw);
      // Assert
      expect(holder.name).toBe('Alice');
      expect(holder.email).toBe('alice@example.com');
    });

    it('kastar fel för tomt namn', () => {
      // Arrange
      const name = '';
      const email = 'test@example.com';
      // Act + Assert
      expect(() => new AccountHolder(name, email)).toThrow('Name is required');
    });

    it('kastar fel för tom email', () => {
      // Arrange
      const name = 'User';
      const email = '';
      // Act + Assert
      expect(() => new AccountHolder(name, email)).toThrow('Valid email is required');
    });

    it('kastar fel för ogiltig email', () => {
      // Arrange
      const name = 'User';
      const email = 'invalid-email';
      // Act + Assert
      expect(() => new AccountHolder(name, email)).toThrow('Valid email is required');
    });
  });

  describe('Updates', () => {
    beforeEach(() => {
      holder = new AccountHolder('Alice', 'alice@example.com');
    });

    it('uppdaterar namn och trimmar whitespace', () => {
      // Arrange
      const newName = '  Bob  ';
      // Act
      holder.setName(newName);
      // Assert
      expect(holder.name).toBe('Bob');
    });

    it('kastar fel när namn uppdateras till tomt', () => {
      // Arrange
      const badName = '';
      // Act + Assert
      expect(() => holder.setName(badName)).toThrow('Name is required');
    });

    it('uppdaterar email och trimmar whitespace', () => {
      // Arrange
      const newEmail = '  bob@example.com  ';
      // Act
      holder.setEmail(newEmail);
      // Assert
      expect(holder.email).toBe('bob@example.com');
    });

    it('kastar fel när email uppdateras till ogiltig', () => {
      // Arrange
      const badEmail = 'not-an-email';
      // Act + Assert
      expect(() => holder.setEmail(badEmail)).toThrow('Valid email is required');
    });
  });

  describe('Edge cases', () => {
    it('hanterar namn med specialtecken', () => {
      // Arrange
      const specialName = "O'Connor";
      const specialEmail = 'o.connor@example.com';
      // Act
      holder = new AccountHolder(specialName, specialEmail);
      // Assert
      expect(holder.name).toBe("O'Connor");
      expect(holder.email).toBe('o.connor@example.com');
    });
  });
});
