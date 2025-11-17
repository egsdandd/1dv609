const readline = require('readline');
const accountMenu = require('./accountMenu');
const bankAccountMenu = require('./bankAccountMenu')
const notificationService = require('../src/services/notificationServiceSingleton');

function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

// Visa huvudmenyn med readline-objektet rl och en callback för återgång
function showMainMenu(rl) {
  console.log('\n---- Huvudmeny ----');
  console.log('1. Hantera AccountHolder');
  console.log('2. Hantera BankAccount');
  console.log('3. Lista notifieringar');
  console.log('0. Avsluta');

  rl.question('Välj ett alternativ: ', (answer) => {
    switch (answer.trim()) {
      case '1':
        accountMenu.showMenu(rl, () => showMainMenu(rl));
        break;
      case '2':
        bankAccountMenu.showMenu(rl, () => showMainMenu(rl));
        break;
      case '3':
        // Visar alla notifieringar
        const notifications = notificationService.getNotifications();
        if (notifications.length === 0) {
          console.log('Inga notifieringar.');
        } else {
          console.log('Notifieringar:');
          notifications.forEach((msg, index) => {
            console.log(`${index + 1}. ${msg}`);
          });
        }
        // Efter listning, visa menyn igen
        showMainMenu(rl);
        break;
      case '0':
        rl.close();
        break;
      default:
        console.log('Ogiltigt val, försök igen.');
        showMainMenu(rl);
    }
  });
}

// Starta CLI bara om filen körs direkt (inte vid require/import i tester)
if (require.main === module) {
  const rl = createInterface();

  rl.on('close', () => {
    console.log('Avslutar programmet...');
    process.exit(0);
  });

  showMainMenu(rl);
}

// Exportera för tester
module.exports = { showMainMenu, createInterface };
