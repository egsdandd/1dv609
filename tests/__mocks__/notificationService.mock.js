class NotificationServiceMock {
  constructor() {
    this.notify = jest.fn(); // Spy-funktion som loggar anrop internt för tester
  }
}
module.exports = NotificationServiceMock;
