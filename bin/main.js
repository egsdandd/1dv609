#!/usr/bin/env node
const readline = require('readline');
const AccountHolder = require('../src/accountHolder');
// const BankAccount = require('../src/bankAccount'); // Importera fler klasser vid behov

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let accountHolders = [];

function showMainMenu() {
  console.log('\n---- Huvudmeny ----');
  console.log('1. Hantera AccountHolder');
  console.log('2. Hantera BankAccount');
  console.log('0. Avsluta');
  rl.question('Välj ett alternativ: ', (answer) => {
    switch (answer.trim()) {
      case '1':
        showAccountHolderMenu();
        break;
      // case '2':
      //   showBankAccountMenu();
      //   break;
      case '0':
        rl.close();
        break;
      default:
        console.log('Ogiltigt val, försök igen.');
        showMainMenu();
    }
  });
}

function showAccountHolderMenu() {
  console.log('\n--- AccountHolder ---');
  console.log('1. Lägg till');
  console.log('2. Lista');
  console.log('3. Uppdatera');
  console.log('4. Ta bort');
  console.log('0. Tillbaka');
  rl.question('Välj ett alternativ: ', (answer) => {
    switch (answer.trim()) {
      case '1':
        addAccountHolder();
        break;
      case '2':
        listAccountHolders();
        break;
      case '3':
        updateAccountHolder();
        break;
      case '4':
        deleteAccountHolder();
        break;
      case '0':
        showMainMenu();
        break;
      default:
        console.log('Ogiltigt val, försök igen.');
        showAccountHolderMenu();
    }
  });
}

function addAccountHolder() {
  rl.question('Ange namn: ', (name) => {
    rl.question('Ange email: ', (email) => {
      try {
        const holder = new AccountHolder(name, email);
        accountHolders.push(holder);
        console.log('AccountHolder tillagd!');
      } catch (err) {
        console.log('Fel:', err.message);
      }
      showAccountHolderMenu();
    });
  });
}

function listAccountHolders() {
  if (accountHolders.length === 0) {
    console.log('Inga AccountHolders registrerade.');
  } else {
    accountHolders.forEach((h, i) => {
      console.log(`${i + 1}. Namn: ${h.name}, Email: ${h.email}`);
    });
  }
  showAccountHolderMenu();
}

function updateAccountHolder() {
  listAccountHolders();
  rl.question('Ange numret på den du vill uppdatera: ', (num) => {
    const index = parseInt(num) - 1;
    if (index < 0 || index >= accountHolders.length) {
      console.log('Ogiltigt val.');
      return showAccountHolderMenu();
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
        showAccountHolderMenu();
      });
    });
  });
}

function deleteAccountHolder() {
  listAccountHolders();
  rl.question('Ange numret på den du vill ta bort: ', (num) => {
    const index = parseInt(num) - 1;
    if (index < 0 || index >= accountHolders.length) {
      console.log('Ogiltigt val.');
      return showAccountHolderMenu();
    }
    accountHolders.splice(index, 1);
    console.log('AccountHolder borttagen!');
    showAccountHolderMenu();
  });
}

rl.on('close', () => {
  console.log('Avslutar...');
  process.exit(0);
});

showMainMenu();
