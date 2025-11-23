const NotificationService = require('../src/notificationService');

describe('NotificationService', () => {
  let service;

  beforeEach(() => {
    service = new NotificationService();
    service.clear(); // Säkerställ tom logg för varje test
  });

  describe('notify och notislogg', () => {
    it('sparar meddelanden om saveNotifications är true', () => {
      // Arrange
      const message = 'Testmeddelande';

      // Act
      service.notify(message);

      // Assert
      expect(service.getNotifications()).toContain(message);
    });

    it('sparar INTE notiser om saveNotifications är false', () => {
      // Arrange
      service = new NotificationService('console', { saveNotifications: false });

      // Act
      service.notify('Hej!');

      // Assert
      expect(service.getNotifications()).toHaveLength(0);
    });

    it('tar bort äldsta när maxNotifications nås', () => {
      // Arrange
      service = new NotificationService('console', { maxNotifications: 3 });
      service.notify('one');
      service.notify('two');
      service.notify('three');

      // Act
      service.notify('four');

      // Assert
      expect(service.getNotifications()).toEqual(['two', 'three', 'four']);
    });
  });

  describe('kanallogik', () => {
    let logSpy;
    beforeEach(() => {
      logSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });
    afterEach(() => {
      logSpy.mockRestore();
    });

    it('skriver till konsol (console)', () => {
      // Arrange
      service = new NotificationService('console');

      // Act
      service.notify('Hej konsol');

      // Assert
      expect(logSpy).toHaveBeenCalledWith('NOTIFICATION: Hej konsol');
    });
    it('skriver till konsol för email-kanal', () => {
      // Arrange
      service = new NotificationService('email');

      // Act
      service.notify('Hej epost');

      // Assert
      expect(logSpy).toHaveBeenCalledWith('Simulerar email: Hej epost');
    });
    it('skriver till konsol för sms-kanal', () => {
      // Arrange
      service = new NotificationService('sms');

      // Act
      service.notify('Hej sms');

      // Assert
      expect(logSpy).toHaveBeenCalledWith('Simulerar sms: Hej sms');
    });
    it('skriver till konsol för okänd kanal', () => {
      // Arrange
      service = new NotificationService('push');

      // Act
      service.notify('Hej push');

      // Assert
      expect(logSpy).toHaveBeenCalledWith('Okänd kanal: Hej push');
    });
  });

  describe('logghantering', () => {
    it('clear tömmer hela loggen', () => {
      // Arrange
      service.notify('A');
      service.notify('B');

      // Act
      service.clear();

      // Assert
      expect(service.getNotifications()).toHaveLength(0);
    });

    it('getNotifications returnerar aktuell lista', () => {
      // Arrange
      service.notify('Msg1');
      service.notify('Msg2');

      // Act
      const notes = service.getNotifications();

      // Assert
      expect(notes).toEqual(['Msg1', 'Msg2']);
    });
  });
});
