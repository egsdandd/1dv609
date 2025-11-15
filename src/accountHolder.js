class AccountHolder {
  constructor(name, email) {
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    if (!email || email.trim() === '') {
      throw new Error('Email is required');
    }
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      throw new Error('Invalid email format');
    }
    this.name = trimmedName;
    this.email = trimmedEmail;
  }
}
module.exports = AccountHolder;
