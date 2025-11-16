class NotificationService {
  constructor(channel = 'console', options = {}) {
    this.channel = channel;
    this.saveNotifications = options.saveNotifications !== false; // Standard: true
    this.maxNotifications = options.maxNotifications || 100; // Standard: 100
    this.notifications = [];
  }

  notify(message) {
    if (this.saveNotifications) {
      this.notifications.push(message);
      // Begränsa arrayens storlek för att undvika minnesläcka
      if (this.notifications.length > this.maxNotifications) {
        this.notifications.shift(); // Ta bort äldsta meddelandet
      }
    }
    switch (this.channel) {
      case 'console':
        console.log(`NOTIFICATION: ${message}`);
        break;
      case 'email':
        // Simulera mailutskick
        console.log(`Simulerar email: ${message}`);
        break;
      case 'sms':
        // Simulera sms
        console.log(`Simulerar sms: ${message}`);
        break;
      default:
        console.log(`Okänd kanal: ${message}`);
    }
  }
  getNotifications() {
    return this.notifications;
  }
  clear() {
    this.notifications = [];
  }
}
module.exports = NotificationService;
