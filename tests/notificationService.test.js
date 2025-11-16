// notificationService.test.js
const NotificationService = require('../src/notificationService');

describe('NotificationService', () => {
  let service;

  beforeEach(() => {
    service = new NotificationService();
  });

  test('notify ska logga och spara meddelanden', () => {
    // Arrange
    const message = 'Testmeddelande';

    // Act
    service.notify(message);

    // Assert
    const notifications = service.getNotifications();
    expect(notifications).toContain(message);
    expect(notifications.length).toBe(1);
  });

  test('clear ska tömma notisloggen', () => {
    // Arrange
    service.notify('Meddelande 1');
    service.notify('Meddelande 2');

    // Act
    service.clear();

    // Assert
    expect(service.getNotifications().length).toBe(0);
  });
});
