# Study Questions - TDD & Unit Testing

## 1. What is a unit?

En **unit** är den minsta testbara delen av en applikation. I objektorienterad programmering är en unit vanligtvis:

- En enskild metod eller funktion
- En klass (i vissa sammanhang)
- En modul med väl definierat ansvar

**I detta projekt:**

- `AccountHolder.setEmail()` är en unit
- `BankAccount.deposit()` är en unit
- Hela `Transaction`-klassen kan betraktas som en unit

**Viktigt:** En unit ska vara isolerad och testbar oberoende av andra units.

---

## 2. How does TDD differ from standard types of testing?

**TDD (Test Driven Development):**

- Test **före** implementation
- Cykel: Red → Green → Refactor
- Drivet av tester (testen definierar kraven)
- Fokus på design och testbarhet

**Standard testing:**

- Test **efter** implementation
- Verifierar befintlig kod
- Kan vara svårare att testa dåligt designad kod
- Ofta lägre code coverage

**Huvudskillnad:** TDD använder tester för att **driva** utvecklingen, medan standard testing **verifierar** färdig kod.

---

## 3. What is an Oracle?

En **test oracle** är en mekanism som avgör om ett test ska passera eller misslyckas. Det är källan till "rätt svar" som vi jämför testresultatet mot.

**Typer av oracles:**

- **Specifikation:** Formella krav eller dokumentation
- **Jämförelse:** Jämföra med annan implementation
- **Regression:** Tidigare körningar (regression testing)
- **Mänsklig bedömning:** Utvecklarens förståelse

**Exempel från projektet:**

```javascript
expect(balance).toBe(100); // Oracle: Vi vet att balance ska vara 100
expect(() => new AccountHolder('', 'test@test.com')).toThrow('Name is required');
// Oracle: Vi vet att tomt namn ska kasta fel
```

---

## 4. How does an oracle know what is right?

Oracle baserar "rätt svar" på:

1. **Specifikationer/Krav:** Dokumenterade krav för systemet
2. **Domänkunskap:** Förståelse för problemdomänen (t.ex. ett bankkonto kan inte ha negativt saldo)
3. **Matematik/Logik:** Objektiva sanningar (100 + 50 = 150)
4. **Business rules:** Affärsregler (stor insättning > 10000 ska notifiera)

**Exempel:**

```javascript
// Oracle: Matematisk sanning
account.deposit(100);
expect(account.getBalance()).toBe(100);

// Oracle: Business rule
account.deposit(15000);
expect(notifier.notify).toHaveBeenCalledWith('Large deposit: 15000 SEK');
```

Oracle är **inte** alltid perfekt - det kan innehålla fel baserat på felaktig förståelse av kraven.

---

## 5. What might you need to change in the SUT in order to make good use of unit testing?, compared to when not doing unit testing

För att göra kod testbar behöver du ofta:

1. **Dependency Injection** istället för hårdkodade dependencies

   ```javascript
   // Före (svårt att testa):
   constructor(accountHolder) {
     this.notifier = new NotificationService();
   }
   
   // Efter (testbart):
   constructor(accountHolder, notificationService) {
     this.notifier = notificationService;
   }
   ```

2. **Lös koppling** mellan komponenter
3. **Bryta upp stora metoder** till mindre, testbara enheter
4. **Undvika globalt state**
5. **Gör privata metoder testbara** (genom att testa dem indirekt via publika metoder)
6. **Separera I/O från logik** (t.ex. separera databas-access från business logic)

**I projektet:**

- `BankAccount` injicerar `NotificationService` → möjliggör mockning
- Privata fält (`#balance`) testas via publika metoder (`getBalance()`)

---

## 6. Do all tests need to use asserts?

**Nej**, men de flesta gör det.

**Undantag:**

1. **Test för exceptions:**

   ```javascript
   expect(() => new AccountHolder('', 'test@test.com')).toThrow();
   ```

2. **Test med mock verifikation:**

   ```javascript
   // Verifierar att metod anropades
   expect(notifier.notify).toHaveBeenCalled();
   ```

3. **Smoke tests:** Tester som bara kollar att kod körs utan att krascha

**Men:** Varje test bör ha någon form av **verifikation** (assert, expect, verify).

---

## 7. What makes black box testing different from white box testing?

**Black Box Testing:**

- Testar **beteende** utan kunskap om intern implementation
- Baserat på specifikationer/krav
- Tester påverkas inte av implementation changes
- Exempel: Testa att `deposit(100)` ökar saldo med 100

**White Box Testing:**

- Testar **intern struktur** och logik
- Kräver kunskap om implementation
- Kan testa specifika code paths
- Exempel: Testa att if-satsen för stora insättningar fungerar

**I projektet:**

```javascript
// Black box: Testar beteende
account.deposit(100);
expect(account.getBalance()).toBe(100);

// White box: Testar intern logik
account.deposit(15000);
expect(notifier.notify).toHaveBeenCalled(); // Vi vet att det finns en if-sats för > 10000
```

---

## 8. Why might we want to use black box testing?

**Fördelar:**

1. **Oberoende av implementation:** Tester bryts inte när intern kod ändras
2. **Fokus på krav:** Verifierar att systemet gör vad det ska
3. **Testare behöver inte kodkunskap:** Kan testas av QA-team
4. **Upptäcker saknade funktioner:** Testar från användarens perspektiv
5. **Bättre refactoring:** Kan ändra implementation utan att ändra tester

**Exempel från projektet:**
Våra tester testar främst beteende (black box), vilket gör att vi kan refaktorera intern implementation utan att ändra testerna.

---

## 9. What is the purpose of unit-testing?

**Huvudsyften:**

1. **Hitta buggar tidigt:** Enklare och billigare att fixa
2. **Dokumentation:** Tester visar hur kod ska användas
3. **Design-feedback:** Svårtestbar kod indikerar dålig design
4. **Regression-skydd:** Upptäcker när ändringar bryter befintlig funktionalitet
5. **Refactoring-säkerhet:** Kan ändra kod med förtroende
6. **Kvalitetssäkring:** Höjer kodkvalitet

**I projektet:**
Våra unit tests säkerställer att varje klass fungerar korrekt isolerat och skyddar mot regressioner.

---

## 10. What are equivalence partitioning and boundary value analysis?

**Equivalence Partitioning:**
Dela input-värden i grupper som förväntas bete sig likadant. Testa en representant från varje partition.

**Exempel:**

```javascript
// Partitioner för deposit amount:
// 1. Negativa värden (invalid)
// 2. Noll (invalid)
// 3. Små positiva värden (valid)
// 4. Stora värden > 10000 (valid, triggar notifikation)
```

**Boundary Value Analysis:**
Testa värden vid gränserna mellan partitioner.

**Exempel:**

```javascript
// Gränser för notifikation vid 10000:
deposit(9999);  // Precis under gränsen
deposit(10000); // På gränsen
deposit(10001); // Precis över gränsen
```

**I projektet:**

```javascript
// Boundary testing för stora insättningar
it('should notify for large deposits', () => {
  account.deposit(10001); // Över gränsen
  expect(notifier.notify).toHaveBeenCalled();
});
```

---

## 11. Why do we use TDD? What is its purpose?

**Syften med TDD:**

1. **Bättre design:** Tvingar till testbar, lös kopplad kod
2. **Krav först:** Tester definierar vad koden ska göra
3. **Mindre debugging:** Buggar hittas direkt
4. **Förtroende:** Alla tester passerar = systemet fungerar
5. **Dokumentation:** Tester visar hur systemet ska användas
6. **Regression-skydd:** Inbyggt från start
7. **YAGNI-princip:** Skriver bara kod som behövs för att klara testen

**TDD-cykeln:**

1. **Red:** Skriv ett failande test
2. **Green:** Skriv minsta möjliga kod för att klara testet
3. **Refactor:** Förbättra koden utan att ändra beteende

---

## 12. If multiple tests are broken, which tests are most important to priorities fixing?

**Prioritetsordning:**

1. **Unit tests i lägsta lager** (dependencies för andra klasser)
   - Exempel: Om `AccountHolder` failar, fixa det först eftersom `BankAccount` beror på det

2. **Tests för kritisk funktionalitet**
   - Exempel: `deposit()` och `withdraw()` är kärnfunktionalitet

3. **Tests som failade först**
   - Första felet kan ha orsakat de andra

4. **Root cause tests**
   - Fixa grundorsaken, inte symptomen

**Exempel:**
Om både `BankAccount` och `Transaction` tests failar, kolla om `Transaction` är grundorsaken (eftersom `BankAccount` använder `Transaction`).

---

## 13. Can we always have 100% code-coverage?

**Nej, inte alltid:**

**Svårt/omöjligt att täcka:**

1. **Error-hantering för externa system** (databas crashes, nätverksfel)
2. **Platform-specifik kod** (olika OS-beteenden)
3. **Timing-beroende kod** (race conditions)
4. **Legacy kod utan testbarhet**
5. **Defensive programming** (kod som "aldrig ska hända")

**Exempel:**

```javascript
try {
  notificationService.notify(message);
} catch {
  // Svårt att framkalla denna catch i test
  // om NotificationService inte kan kastas errors
}
```

**Bättre mål:** 80-90% coverage + fokus på kritisk funktionalitet.

---

## 14. What are the different types of coverage criteria?

**1. Statement Coverage (Line Coverage):**

- Varje kodrad exekveras minst en gång
- Mest grundläggande

**2. Branch Coverage (Decision Coverage):**

- Varje if/else-gren exekveras
- Bättre än statement coverage

**3. Condition Coverage:**

- Varje boolean sub-expression testas till true och false

**4. Path Coverage:**

- Alla möjliga vägar genom koden testas
- Ofta opraktiskt (exponentiell tillväxt)

**5. Function Coverage:**

- Varje funktion anropas minst en gång

**6. MC/DC (Modified Condition/Decision Coverage):**

- Varje condition påverkar resultatet oberoende
- Används i safety-critical systems

**I projektet:**
Jest mäter statement, branch, function och line coverage.

---

## 15. Why do we use mock objects?

**Huvudanledningar:**

1. **Isolering:** Testa en unit utan dess dependencies
2. **Kontrollera beteende:** Verifiera att rätt metoder anropas
3. **Snabba tester:** Undvik långsamma operations (databas, API)
4. **Testbarhet:** Testa edge cases som är svåra att framkalla
5. **Oberoende:** Tester påverkas inte av externa systems tillstånd

**Exempel från projektet:**

```javascript
// Mock för att isolera BankAccount från NotificationService
const notifier = new NotificationServiceMock();
const account = new BankAccount(holder, notifier);

account.deposit(15000);
expect(notifier.notify).toHaveBeenCalledWith('Large deposit: 15000 SEK');
```

---

## 16. What is the difference between a mock, a stub, and a spy?

**Stub:**

- Ger förutbestämda svar
- Används för att styra test-flöde
- **Fokus:** State verification

```javascript
const stub = {
  getBalance: () => 100 // Returnerar alltid 100
};
```

**Mock:**

- Fördefinierade förväntningar
- Verifierar att metoder anropas korrekt
- **Fokus:** Behavior verification

```javascript
const mock = {
  notify: jest.fn()
};
expect(mock.notify).toHaveBeenCalledWith('message');
```

**Spy:**

- Observerar anrop till riktig implementation
- Låter riktig kod köra men loggar anrop
- **Fokus:** Både behavior och state

```javascript
const spy = jest.spyOn(service, 'notify');
service.notify('test');
expect(spy).toHaveBeenCalled();
```

**I projektet:**
Vi använder främst **mocks** (`NotificationServiceMock`) för behavior verification.

---

## 17. Does 100% coverage mean we are bug-free?

**Nej, absolut inte.**

**Varför inte:**

1. **Coverage mäter execution, inte correctness**

   ```javascript
   // 100% coverage men fel logik:
   deposit(amount) {
     this.balance -= amount; // Bug! Ska vara +=
   }
   // Test kan ha 100% coverage men fel assertion
   ```

2. **Missing tests:** Coverage säger inget om vad som INTE testats
3. **Integration issues:** Units kan fungera separat men inte tillsammans
4. **Business logic errors:** Koden gör fel sak men "rätt"
5. **Edge cases:** Kan missas även med hög coverage

**Coverage visar:**

- Vilken kod som exekverades
- Inte om resultatet var korrekt
- Inte om alla scenarios testats

---

## 18. Does 100% MCDC coverage mean we are bug-free?

**Nej, men det är bättre än basic coverage.**

**MC/DC (Modified Condition/Decision Coverage):**

- Mer stringent än branch coverage
- Varje condition måste oberoende påverka resultatet
- Används i aviation/automotive (safety-critical)

**Men fortfarande:**

1. **Testar inte logik-korrekthet** - bara att conditions evalueras
2. **Missar integration issues**
3. **Missar runtime errors** (null pointers, race conditions)
4. **Testar inte requirements** - bara implementation

**Exempel:**

```javascript
// 100% MC/DC men fel business logic
if (amount > 10000 && balance > 0) {
  notify(); // Fel: Ska kanske vara amount > 5000?
}
```

Coverage är ett verktyg för att hitta **otestade områden**, inte en garanti för **kvalitet**.

---

## 19. Can we prove that we're 100% bug-free?

**Nej, i praktiken omöjligt för icke-triviala system.**

**Varför:**

1. **Oändliga input-kombinationer:** Kan inte testa alla möjliga inputs
2. **State explosion:** För många möjliga systemtillstånd
3. **Okända requirements:** Bugs kan vara diskrepans mot okända krav
4. **Runtime miljö:** Hardware, OS, timing issues
5. **Human error:** Krav, design, implementation kan alla innehålla fel

**Teoretiskt:**

- **Formell verifikation** kan bevisa korrekthet för små, formellt specificerade system
- Praktiskt opraktiskt för större system

**Bästa approach:**

- Hög test coverage
- Olika test-typer (unit, integration, system)
- Code reviews
- Static analysis
- Monitoring i produktion

**Citat:** "Program testing can be used to show the presence of bugs, but never to show their absence!" - Edsger Dijkstra

---

## 20. In TDD, Why do we go for RED first?

**Anledningar att börja med RED (failande test):**

1. **Verifierar att testet fungerar**
   - Ett test som alltid är grönt är värdelöst
   - RED → GREEN bevisar att testet detekterar problemet

2. **Definierar krav först**
   - Tänk igenom vad koden ska göra innan implementation
   - Skriv specifikation som körbar test

3. **Förhindrar over-engineering**
   - Implementera bara det som behövs för att klara testet
   - YAGNI (You Ain't Gonna Need It)

4. **Säkerställer testbarhet**
   - Om test är svårt att skriva, indikerar det dålig design
   - Möjlighet att fixa design innan implementation

5. **Mental discipline**
   - Tvingar rätt arbetsflöde
   - Förhindrar "test i efterhand"

**Exempel:**

```javascript
// 1. RED: Skriv failande test
test('should throw error for negative deposit', () => {
  expect(() => account.deposit(-100)).toThrow('Invalid amount');
});
// Test failar → Implementation finns inte

// 2. GREEN: Implementera minimum
deposit(amount) {
  if (amount <= 0) throw new Error('Invalid amount');
  this.balance += amount;
}
// Test passerar

// 3. REFACTOR: Förbättra kod
deposit(amount) {
  this.validateAmount(amount);
  this.balance += amount;
}
```

**RED först = Proof att vårt test faktiskt testar något!**
