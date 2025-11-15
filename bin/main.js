const readline = require('readline');
const accountMenu = require('./account');

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
  console.log('0. Avsluta');
  rl.question('Välj ett alternativ: ', (answer) => {
    switch (answer.trim()) {
      case '1':
        accountMenu.showMenu(rl, () => showMainMenu(rl)); // skickar callback för återgång
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
