# Kravanalys - 1dv609 TDD Assignment 1 Alt 2

## Sammanfattning

### Status: ✅ Alla minimikrav är uppfyllda

---

## Detaljerad kravanalys

### 1. ✅ Minst 4 SUT-klasser med dependencies

**Krav:** In the final project show **at least 4 SUT-classes with dependencies**. The more classes the better

**Status:** ✅ Uppfyllt

**Klasser i projektet:**

1. **AccountHolder** (`src/accountHolder.js`)
   - Ansvarar för användardata (namn, email)
   - Inga dependencies

2. **BankAccount** (`src/bankAccount.js`)
   - Dependencies:
     - `AccountHolder` (injiceras via konstruktor)
     - `NotificationService` (injiceras via konstruktor)
     - `Transaction` (skapas dynamiskt)

3. **Transaction** (`src/transaction.js`)
   - Representerar en transaktion (insättning/uttag)
   - Inga externa dependencies

4. **NotificationService** (`src/notificationService.js`)
   - Hanterar notifieringar via olika kanaler
   - Inga dependencies

**Antal SUT-klasser:** 4 ✅

---

### 2. ✅ Dependency Injection används

**Krav:** You have used **dependency injection**

**Status:** ✅ Uppfyllt

**Exempel på Dependency Injection:**

#### BankAccount konstruktor

```javascript
constructor(accountHolder, notificationService) {
  this.#accountHolder = accountHolder;
  this.#notificationService = notificationService;
}
```

- `accountHolder` injiceras
- `notificationService` injiceras

#### I tester (bankAccount.test.js)

```javascript
beforeEach(() => {
  holder = new AccountHolder('Dummy', 'dummy@example.com');
  notifier = new NotificationServiceMock();
  account = new BankAccount(holder, notifier);
});
```

**Fördelar som demonstreras:**

- Möjliggör mockning av `NotificationService` i tester
- Lös koppling mellan klasser
- Testbarhet

---

### 3. ✅ Mocking/Isolering av dependencies

**Krav:** You needed to **mock or isolate dependencies** so that only bugs in the class under test trigger a failing test and not a bug in other classes.

**Status:** ✅ Uppfyllt

**Mock-implementationer:**

1. **NotificationServiceMock** (`tests/__mocks__/notificationService.mock.js`)
   - Mockar `NotificationService` för att isolera `BankAccount`-tester
   - Används i `bankAccount.test.js`

2. **Användning i tester:**

```javascript
const NotificationServiceMock = require('./__mocks__/notificationService.mock');
notifier = new NotificationServiceMock();
account = new BankAccount(holder, notifier);
```

**Fördelar:**

- `BankAccount`-tester är isolerade från `NotificationService` bugar
- Endast bugar i `BankAccount` kommer att orsaka test-failures
- Möjliggör verifiering av att notifieringar skickas vid stora insättningar

---

### 4. ✅ Dynamic Object Creation (2+ ställen)

**Krav:** **Dynamic object creation** (`new SomeClassOrOther()`) in several (2+) parts of the application (not only as initial setup). Remember to test those too!

**Status:** ✅ Uppfyllt

**Exempel på dynamisk objektskapning:**

#### 1. I BankAccount.deposit() - rad 23

```javascript
deposit(amount) {
  // ...
  const tx = new Transaction(amount, 'deposit');
  this.#transactions.push(tx);
  // ...
}
```

#### 2. I BankAccount.withdraw() - rad 38

```javascript
withdraw(amount) {
  // ...
  const tx = new Transaction(amount, 'withdraw');
  this.#transactions.push(tx);
  // ...
}
```

#### 3. I accountMenu.js - rad 58

```javascript
async function addAccountHolder(rl) {
  // ...
  const holder = new AccountHolder(name, email);
  accountHolders.push(holder);
  // ...
}
```

**Testas i:**

- `bankAccount.test.js` - testar att transaktioner skapas korrekt
- `transaction.test.js` - testar Transaction-klass
- `accountHolder.test.js` - testar AccountHolder-klass

**Antal ställen:** 3 (krav var 2+) ✅

---

### 5. ✅ UI (Console, GUI, eller Web)

**Krav:** The project has a **UI** (Console, GUI, or web)

**Status:** ✅ Uppfyllt - Console UI

**UI-implementering:**

#### Huvudmeny (`bin/main.js`)

``` txt
---- Huvudmeny ----
1. Hantera AccountHolder
2. Hantera BankAccount
3. Lista notifieringar
0. Avsluta
```

#### AccountHolder Menu (`bin/accountMenu.js`)

``` txt
--- AccountHolder Meny ---
1. Lägg till
2. Lista
3. Uppdatera
4. Ta bort
0. Tillbaka
```

#### BankAccount Menu (`bin/bankAccountMenu.js`)

- Välja konto
- Insättningar
- Uttag
- Visa saldo
- Visa transaktionshistorik

**Funktionalitet:**

- ✅ Fullt interaktiv console-baserad UI
- ✅ Input-hantering via `readline`
- ✅ Använder samtliga SUT-klasser
- ✅ Error-hantering och användarfeedback
- ✅ Notifieringssystem integrerat

---

## Sammanfattning per krav

| Krav | Status | Bevis |
|------|--------|-------|
| 4+ SUT-klasser med dependencies | ✅ | 4 klasser: AccountHolder, BankAccount, Transaction, NotificationService |
| Dependency Injection | ✅ | BankAccount injicerar AccountHolder och NotificationService |
| Mock/Isolering | ✅ | NotificationServiceMock används i BankAccount-tester |
| Dynamic Object Creation (2+) | ✅ | Transaction skapas i deposit/withdraw, AccountHolder i menu (3 ställen) |
| UI (Console/GUI/Web) | ✅ | Fullständig Console-baserad UI med menyer |

---

## Ytterligare styrkor i projektet

### Testing

- Jest som test-framework
- Mock-implementationer
- High code coverage (visas i coverage-rapporter)
- BeforeEach för setup
- Arrange-Act-Assert pattern

### Design Patterns

- Dependency Injection
- Singleton pattern (NotificationServiceSingleton)
- Separation of Concerns (UI-lager, Domän-lager, Service-lager)
- Encapsulation (privata fält med #)

### Code Quality

- Validering av input
- Error-hantering
- Minneslycka-skydd (max 100 notifieringar)
- Type-checking

---

## Slutsats

Projektet uppfyller **alla minimikrav** för Assignment 1 Part 2:

✅ 4+ SUT-klasser med dependencies  
✅ Dependency Injection  
✅ Mocking och isolering av dependencies  
✅ Dynamic object creation på 3 ställen (krav: 2+)  
✅ Console UI med full funktionalitet  

Projektet visar god förståelse för:

- TDD-principer
- Unit testing med Jest
- Mocking och isolering
- Objektorienterad design
- Separation of concerns
