// notificationServiceSingleton.js
const NotificationService = require('../notificationService');
const notificationService = new NotificationService('console', { saveNotifications: true });
module.exports = notificationService;
// Exempel på användning i andra moduler:
// const notificationService = require('./notificationServiceSingleton');
// notificationService.notify('Detta är ett testmeddelande.');
