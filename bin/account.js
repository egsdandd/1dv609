const AccountHolder = require('../src/accountHolder');

let accountHolders = [];

function showMenu(rl, backToMainMenu) {
  console.log('\n--- AccountHolder Meny ---');
  console.log('1. Lägg till');
  console.log('2. Lista');
  console.log('3. Uppdatera');
  console.log('4. Ta bort');
  console.log('0. Tillbaka');

  rl.question('Välj ett alternativ: ', (answer) => {
    switch (answer.trim()) {
      case '1':
        addAccountHolder(rl, backToMainMenu);
        break;
      case '2':
        listAccountHolders(rl, backToMainMenu);
        break;
      case '3':
        updateAccountHolder(rl, backToMainMenu);
        break;
      case '4':
        deleteAccountHolder(rl, backToMainMenu);
        break;
      case '0':
        backToMainMenu();
        break;
      default:
        console.log('Ogiltigt val, försök igen.');
        showMenu(rl, backToMainMenu);
    }
  });
}

function addAccountHolder(rl, backToMainMenu) {
  rl.question('Ange namn: ', (name) => {
    rl.question('Ange email: ', (email) => {
      try {
        const holder = new AccountHolder(name, email);
        accountHolders.push(holder);
        console.log('AccountHolder tillagd!');
      } catch (err) {
        console.log('Fel:', err.message);
      }
      showMenu(rl, backToMainMenu);
    });
  });
}

function listAccountHolders(rl, callback) {
  if (accountHolders.length === 0) {
    console.log('Inga AccountHolders registrerade.');
  } else {
    accountHolders.forEach((h, i) => {
      console.log(`${i + 1}. Namn: ${h.name}, Email: ${h.email}`);
    });
  }
  if (callback) callback();  // Kör callback utan att visa meny
}


function updateAccountHolder(rl, backToMainMenu) {
  listAccountHolders(rl, () => {
    rl.question('Ange numret på den du vill uppdatera: ', (num) => {
      const index = parseInt(num) - 1;
      if (index < 0 || index >= accountHolders.length) {
        console.log('Ogiltigt val.');
        return updateAccountHolder(rl, backToMainMenu); // Ställ frågan igen
      }
      const holder = accountHolders[index];
      rl.question(`Ange nytt namn (nuvarande: ${holder.name}): `, (name) => {
        rl.question(`Ange ny email (nuvarande: ${holder.email}): `, (email) => {
          try {
            if (name.trim() !== '') holder.setName(name);
            if (email.trim() !== '') holder.setEmail(email);
            console.log('AccountHolder uppdaterad!');
          } catch (err) {
            console.log('Fel:', err.message);
          }
          showMenu(rl, backToMainMenu);
        });
      });
    });
  });
}


function deleteAccountHolder(rl, backToMainMenu) {
  listAccountHolders(rl, () => {
    rl.question('Ange numret på den du vill ta bort: ', (num) => {
      const index = parseInt(num) - 1;
      if (index < 0 || index >= accountHolders.length) {
        console.log('Ogiltigt val.');
        return deleteAccountHolder(rl, backToMainMenu); // Visa frågan igen
      }
      accountHolders.splice(index, 1);
      console.log('AccountHolder borttagen!');
      showMenu(rl, backToMainMenu);  // Visa huvudmenyn igen
    });
  });
}


module.exports = { showMenu, accountHolders };

