class NotificationServiceMock {
  notify(message) {
    // Loggar eller samlar meddelanden för teständamål
    console.log('Notification sent:', message);
    return message;
  }
}
module.exports = NotificationServiceMock;
