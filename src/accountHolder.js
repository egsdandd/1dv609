class AccountHolder {
  constructor(name, email, notificationService = null) {
    this.setName(name);
    this.setEmail(email);
    this.notificationService = notificationService;

    // Skicka notifikation om notifieringstjänst finns
    if (this.notificationService) {
      this.notificationService.notify(`Ny användare skapad: ${this.name} (${this.email})`);
    }
  }

  setName(name) {
    if (!name || name.trim() === '') {
      throw new Error('Name is required');
    }
    this.name = name.trim();
  }

  setEmail(email) {
    if (!email || !this.isValidEmail(email.trim())) {
      throw new Error('Valid email is required');
    }
    this.email = email.trim();
  }

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
}

module.exports = AccountHolder;
