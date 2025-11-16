const readline = require('readline');
const main = require('../../bin/main');
const accountMenu = require('../../bin/accountMenu');
const bankAccountMenu = require('../../bin/bankAccountMenu');
const AccountHolder = require('../../src/accountHolder');

jest.mock('readline');

const TIMEOUT = 500;

describe('BankAccount Menu (menyval 2)', () => {
    let rl;
    let logs = [];

    beforeEach(() => {
        logs = [];

        rl = {
            question: jest.fn(),
            close: jest.fn(),
            on: jest.fn(),
        };

        readline.createInterface.mockReturnValue(rl);
        jest.spyOn(console, 'log').mockImplementation(msg => logs.push(msg));

        // Rensa AccountHolder-listan och bankAccounts i bankAccountMenu
        accountMenu.accountHolders.length = 0;
        // Vi kan t.ex. få bort alla konton genom reflection eller om bankAccounts exporteras - annars skapa ny instans för varje test
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('gör insättning och visar saldo för valt konto', (done) => {
        // Förbered kontoinnehavare
        const holder1 = new AccountHolder('danne', 'danne@mail.se');
        const holder2 = new AccountHolder('bob', 'bob@mail.se');
        accountMenu.accountHolders.push(holder1, holder2);

        // Simulera inputflödet:
        // Huvudmeny: 2 (Hantera BankAccount)
        // Välj konto: 1 (danne)
        // BankAccount meny: 1 (Sätt in pengar)
        // Belopp: 1000
        // BankAccount meny: 3 (Visa saldo)
        // BankAccount meny: 0 (Tillbaka till konto-välj)
        // BankAccount meny (välj konto): 0 (Tillbaka till huvudmeny)
        // Huvudmeny: 0 (Avsluta)

        rl.question
            .mockImplementationOnce((prompt, cb) => cb('2'))   // huvudmeny: BankAccount
            .mockImplementationOnce((prompt, cb) => cb('1'))   // konto val: danne
            .mockImplementationOnce((prompt, cb) => cb('1'))   // BankAccount: Sätt in pengar
            .mockImplementationOnce((prompt, cb) => cb('1000'))// insättningsbelopp
            .mockImplementationOnce((prompt, cb) => cb('3'))   // Visa saldo
            .mockImplementationOnce((prompt, cb) => cb('0'))   // Tillbaka från BankAccount meny (till konto-välj)
            .mockImplementationOnce((prompt, cb) => cb('0'))   // Tillbaka från konto-välj (till huvudmeny)
            .mockImplementationOnce((prompt, cb) => cb('0'));  // Avsluta i huvudmeny

        main.showMainMenu(rl);

        setTimeout(() => {
            // Kolla att insättningen är registrerad på dannes konto
            const holderAccount = bankAccountMenu.bankAccounts.get(holder1);
            expect(holderAccount).toBeDefined();
            expect(holderAccount.getBalance()).toBe(1000);

            // Kolla att saldot visades i loggarna
            const saldoLog = logs.find(log => log.includes('Saldo:'));
            expect(saldoLog).toContain('1000');

            done();
        }, TIMEOUT);
    });

    test('gör uttag med fel saldo och lyckat uttag', (done) => {
        const holder = new AccountHolder('danne', 'danne@mail.se');
        accountMenu.accountHolders.push(holder);

        rl.question
            .mockImplementationOnce((prompt, cb) => cb('2'))   // huvudmeny: BankAccount
            .mockImplementationOnce((prompt, cb) => cb('1'))   // konto val: danne
            .mockImplementationOnce((prompt, cb) => cb('1'))   // insättning
            .mockImplementationOnce((prompt, cb) => cb('500')) // insättning 500
            .mockImplementationOnce((prompt, cb) => cb('2'))   // uttag
            .mockImplementationOnce((prompt, cb) => cb('1000'))// försök uttag större än saldo
            .mockImplementationOnce((prompt, cb) => cb('2'))   // uttag igen
            .mockImplementationOnce((prompt, cb) => cb('200')) // giltigt uttag
            .mockImplementationOnce((prompt, cb) => cb('3'))   // visa saldo
            .mockImplementationOnce((prompt, cb) => cb('0'))   // tillbaka
            .mockImplementationOnce((prompt, cb) => cb('0'))   // tillbaka till huvudmeny
            .mockImplementationOnce((prompt, cb) => cb('0'));  // avsluta

        main.showMainMenu(rl);

        setTimeout(() => {
            const account = bankAccountMenu.bankAccounts.get(holder);
            expect(account).toBeDefined();
            // Efter att satt in 500 och tagit ut 200, saldo ska vara 300
            expect(account.getBalance()).toBe(300);

            // Kontrollera att felmeddelande om otillräckligt saldo finns i loggar
            const errorLogFound = logs.some(log => log.includes('Fel') && log.includes('Insufficient funds'));
            expect(errorLogFound).toBe(true);

            done();
        }, TIMEOUT);
    });

});
