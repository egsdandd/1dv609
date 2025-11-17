const AccountHolder = require('../src/accountHolder');

let accountHolders = [];
let notificationService = null;

function setNotificationService(service) {
  notificationService = service;
}

// Hjälpfunktion för rl.question som Promise
function questionAsync(rl, prompt) {
  return new Promise(resolve => rl.question(prompt, answer => resolve(answer.trim())));
}

// Hjälpfunktion för notifieringar med try/catch för säkerhet
function notifySafe(message) {
  try {
    notificationService.notify(message);
  } catch {
    // Tyst ignorera notifieringsfel för stabilitet
  }
}

async function showMenu(rl, backToMainMenu) {
  console.log('\n--- AccountHolder Meny ---');
  console.log('1. Lägg till');
  console.log('2. Lista');
  console.log('3. Uppdatera');
  console.log('4. Ta bort');
  console.log('0. Tillbaka');

  const answer = await questionAsync(rl, 'Välj ett alternativ: ');
  switch (answer) {
    case '1':
      await addAccountHolder(rl);
      break;
    case '2':
      listAccountHolders();
      break;
    case '3':
      await updateAccountHolder(rl);
      break;
    case '4':
      await deleteAccountHolder(rl);
      break;
    case '0':
      backToMainMenu();
      return;
    default:
      console.log('Ogiltigt val, försök igen.');
  }
  showMenu(rl, backToMainMenu);
}

async function addAccountHolder(rl) {
  try {
    const name = await questionAsync(rl, 'Ange namn: ');
    const email = await questionAsync(rl, 'Ange email: ');
    const holder = new AccountHolder(name, email);
    accountHolders.push(holder);
    notifySafe(`Ny användare skapad: ${holder.name} (${holder.email})`);
  } catch (err) {
    console.log('Fel:', err.message);
    notifySafe(`Fel vid skapande av AccountHolder: ${err.message}`);
  }
}

function listAccountHolders() {
  if (accountHolders.length === 0) {
    console.log('Inga AccountHolders registrerade.');
  } else {
    accountHolders.forEach((h, i) =>
      console.log(`${i + 1}. Namn: ${h.name}, Email: ${h.email}`)
    );
  }
}

async function updateAccountHolder(rl) {
  listAccountHolders();
  try {
    const numStr = await questionAsync(rl, 'Ange numret på den du vill uppdatera: ');
    const index = parseInt(numStr) - 1;
    if (index < 0 || index >= accountHolders.length) {
      console.log('Ogiltigt val.');
      notifySafe('Ogiltigt val vid uppdatering av AccountHolder.');
      return await updateAccountHolder(rl);
    }

    const holder = accountHolders[index];
    const oldName = holder.name;
    const oldEmail = holder.email;
    const name = await questionAsync(rl, `Ange nytt namn (nuvarande: ${holder.name}): `);
    const email = await questionAsync(rl, `Ange ny email (nuvarande: ${holder.email}): `);

    if (name !== '') holder.setName(name);
    if (email !== '') holder.setEmail(email);

    console.log('AccountHolder uppdaterad!');
    notifySafe(`AccountHolder uppdaterad: ${oldName} (${oldEmail}) till ${holder.name} (${holder.email})`);
  } catch (err) {
    console.log('Fel:', err.message);
    notifySafe(`Fel vid uppdatering av AccountHolder: ${err.message}`);
  }
}

async function deleteAccountHolder(rl) {
  listAccountHolders();
  try {
    const numStr = await questionAsync(rl, 'Ange numret på den du vill ta bort: ');
    const index = parseInt(numStr) - 1;

    if (index < 0 || index >= accountHolders.length) {
      console.log('Ogiltigt val.');
      notifySafe('Ogiltigt val vid borttagning av AccountHolder.');
      return await deleteAccountHolder(rl);
    }

    const removed = accountHolders.splice(index, 1)[0];
    console.log('AccountHolder borttagen!');
    notifySafe(`AccountHolder borttagen: ${removed.name} (${removed.email})`);
  } catch (err) {
    console.log('Fel:', err.message);
    notifySafe(`Fel vid borttagning av AccountHolder: ${err.message}`);
  }
}

module.exports = { showMenu, accountHolders, setNotificationService };
