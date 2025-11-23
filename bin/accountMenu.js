const AccountHolder = require('../src/accountHolder');
const notificationService = require('../src/services/notificationServiceSingleton');

let accountHolders = [];

function resetAccountHolders() {
  accountHolders = [];
}

function questionAsync(rl, prompt) {
  return new Promise(resolve => rl.question(prompt, answer => resolve(answer.trim())));
}

function handleResult(message, notifyMessage = null) {
  console.log(message);
  if (notifyMessage) {
    notifySafe(notifyMessage);
  }
}

function notifySafe(message) {
  try {
    notificationService.notify(message);
  } catch { }
}

const menuOptions = {
  '1': addAccountHolder,
  '2': listAccountHolders,
  '3': updateAccountHolder,
  '4': deleteAccountHolder,
};

async function showMenu(rl, backToMainMenu) {
  console.log('\n--- AccountHolder Meny ---');
  console.log('1. Lägg till');
  console.log('2. Lista');
  console.log('3. Uppdatera');
  console.log('4. Ta bort');
  console.log('0. Tillbaka');

  const answer = await questionAsync(rl, 'Välj ett alternativ: ');
  if (answer === '0') return backToMainMenu();

  const action = menuOptions[answer];
  if (action) {
    await action(rl);
  } else {
    handleResult('Ogiltigt val, försök igen.');
  }
  showMenu(rl, backToMainMenu);
}

async function addAccountHolder(rl) {
  try {
    const name = await questionAsync(rl, 'Ange namn: ');
    const email = await questionAsync(rl, 'Ange email: ');
    const holder = new AccountHolder(name, email);
    accountHolders.push(holder);
    handleResult('AccountHolder tillagd!', `Ny användare skapad: ${holder.name} (${holder.email})`);
  } catch (err) {
    handleResult(`Fel: ${err.message}`, `Fel vid skapande av AccountHolder: ${err.message}`);
  }
}

function listAccountHolders() {
  if (accountHolders.length === 0) {
    handleResult('Inga AccountHolders registrerade.');
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
    const index = parseInt(numStr, 10) - 1;
    if (index < 0 || index >= accountHolders.length) {
      handleResult('Ogiltigt val.', 'Ogiltigt val vid uppdatering av AccountHolder.');
      return await updateAccountHolder(rl);
    }

    const holder = accountHolders[index];
    const oldName = holder.name;
    const oldEmail = holder.email;
    const name = await questionAsync(rl, `Ange nytt namn (nuvarande: ${holder.name}): `);
    const email = await questionAsync(rl, `Ange ny email (nuvarande: ${holder.email}): `);
    if (name !== '') holder.setName(name);
    if (email !== '') holder.setEmail(email);
    handleResult('AccountHolder uppdaterad!', `AccountHolder uppdaterad: ${oldName} (${oldEmail}) till ${holder.name} (${holder.email})`);
  } catch (err) {
    handleResult(`Fel: ${err.message}`, `Fel vid uppdatering av AccountHolder: ${err.message}`);
  }
}

async function deleteAccountHolder(rl) {
  listAccountHolders();
  try {
    const numStr = await questionAsync(rl, 'Ange numret på den du vill ta bort: ');
    const index = parseInt(numStr, 10) - 1;
    if (index < 0 || index >= accountHolders.length) {
      handleResult('Ogiltigt val.', 'Ogiltigt val vid borttagning av AccountHolder.');
      return await deleteAccountHolder(rl);
    }
    const removed = accountHolders.splice(index, 1)[0];
    handleResult('AccountHolder borttagen!', `AccountHolder borttagen: ${removed.name} (${removed.email})`);
  } catch (err) {
    handleResult(`Fel: ${err.message}`, `Fel vid borttagning av AccountHolder: ${err.message}`);
  }
}

module.exports = { showMenu, accountHolders, resetAccountHolders };
