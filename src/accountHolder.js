class AccountHolder {
  constructor(name, email) {
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    if (!email || email.trim() === '') {
      throw new Error('Email is required');
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new Error('Invalid email format');
    }
    this.name = name;
    this.email = email;
  }
}
module.exports = AccountHolder;
