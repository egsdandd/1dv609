// Testfil för NotificationServiceMock
const NotificationServiceMock = require('../__mocks__/notificationService.mock.js');

describe('NotificationServiceMock', () => {
  let mockNotifier;

  beforeEach(() => {
    mockNotifier = new NotificationServiceMock();
  });

  it('should have a notify method', () => {
    expect(typeof mockNotifier.notify).toBe('function');
  });

  it('should track calls to notify', () => {
    mockNotifier.notify('Test message 1');
    mockNotifier.notify('Test message 2');

    expect(mockNotifier.notify).toHaveBeenCalledTimes(2);
    expect(mockNotifier.notify).toHaveBeenCalledWith('Test message 1');
    expect(mockNotifier.notify).toHaveBeenCalledWith('Test message 2');
  });
});
