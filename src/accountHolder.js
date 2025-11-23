class AccountHolder {
  #name;
  #email;

  constructor(name, email) {
    this.setName(name);
    this.setEmail(email);
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  setName(name) {
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    this.#name = name.trim();
  }

  setEmail(email) {
    if (!email || !this.isValidEmail(email.trim())) {
      throw new Error('Valid email is required');
    }
    this.#email = email.trim();
  }

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
}

module.exports = AccountHolder;
