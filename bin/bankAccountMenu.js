const BankAccount = require('../src/bankAccount');
const accountHoldersModule = require('./accountMenu');  // Eller rätt sökväg till din accountHolder-modul

const accountHolders = accountHoldersModule.accountHolders;

const bankAccounts = new Map();  // Map från accountHolder till BankAccount-instans

const questionAsync = (rl, prompt) =>
  new Promise(resolve => rl.question(prompt, answer => resolve(answer.trim())));

async function showMenu(rl, backToMainMenu) {
  if (accountHolders.length === 0) {
    console.log('Inga kontoinnehavare. Skapa en AccountHolder först.');
    backToMainMenu();
    return;
  }

  console.log('\n--- BankAccount Meny ---');
  console.log('Välj ett konto:');

  accountHolders.forEach((h, i) => {
    console.log(`${i + 1}. ${h.name} (${h.email})`);
  });
  console.log('0. Tillbaka');

  const choiceStr = await questionAsync(rl, 'Ange kontonummer: ');
  const choice = parseInt(choiceStr);

  if (choice === 0) {
    backToMainMenu();
    return;
  }

  if (choice < 1 || choice > accountHolders.length) {
    console.log('Ogiltigt val.');
    return showMenu(rl, backToMainMenu);
  }

  const selectedHolder = accountHolders[choice - 1];

  // Hämta redan befintligt bankkonto eller skapa nytt om saknas
  let bankAccount = bankAccounts.get(selectedHolder);
  if (!bankAccount) {
    bankAccount = new BankAccount(selectedHolder, null);
    bankAccounts.set(selectedHolder, bankAccount);
  }

  await bankAccountOperations(rl, bankAccount);

  // Återgå till bankAccount-menyn efter operation
  showMenu(rl, backToMainMenu);
}

async function bankAccountOperations(rl, bankAccount) {
  console.log(`\nHantera konto för ${bankAccount.accountHolder.name}`);
  console.log('1. Sätt in pengar');
  console.log('2. Ta ut pengar');
  console.log('3. Visa saldo');
  console.log('4. Visa transaktionshistorik');
  console.log('0. Tillbaka');

  const option = await questionAsync(rl, 'Välj ett alternativ: ');

  switch (option) {
    case '1': {
      const amountStr = await questionAsync(rl, 'Ange insättningsbelopp: ');
      const amount = parseFloat(amountStr);
      try {
        bankAccount.deposit(amount);
        console.log(`Insatt ${amount} SEK.`);
      } catch (err) {
        console.log(`Fel: ${err.message}`);
      }
      break;
    }
    case '2': {
      const amountStr = await questionAsync(rl, 'Ange uttagsbelopp: ');
      const amount = parseFloat(amountStr);
      try {
        bankAccount.withdraw(amount);
        console.log(`Tagit ut ${amount} SEK.`);
      } catch (err) {
        console.log(`Fel: ${err.message}`);
      }
      break;
    }
    case '3':
      console.log(`Saldo: ${bankAccount.getBalance()} SEK.`);
      break;
    case '4':
      const history = bankAccount.getTransactionHistory();
      if (history.length === 0) {
        console.log('Ingen transaktionshistorik.');
      } else {
        console.log('Transaktionshistorik:');
        history.forEach((tx, i) =>
          console.log(`${i + 1}. ${tx.type} - ${tx.amount} SEK`)
        );
      }
      break;
    case '0':
      return; // Tillbaka till huvudmenyn
    default:
      console.log('Ogiltigt val.');
  }

  // Efter operation, visa operationsmenyn igen
  await bankAccountOperations(rl, bankAccount);
}

module.exports = { showMenu, bankAccounts };
