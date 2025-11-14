const NotificationService = require('../src/notificationService');

describe('NotificationService', () => {
  it('should have a notify method', () => {
    const service = new NotificationService();
    expect(typeof service.notify).toBe('function');
  });
});
