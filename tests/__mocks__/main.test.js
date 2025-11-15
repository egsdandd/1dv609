const readline = require('readline');
const main = require('../../bin/main');
const accountMenu = require('../../bin/account');

jest.mock('readline');

describe('Main CLI', () => {
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

        // Rensa AccountHolder-listan före varje test för isolering
        accountMenu.accountHolders.length = 0;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('showMainMenu visar meny och hanterar ogiltigt val samt exit', () => {
        rl.question
            .mockImplementationOnce((prompt, cb) => cb('invalid'))
            .mockImplementationOnce((prompt, cb) => cb('0'));

        main.showMainMenu(rl);

        expect(logs).toContain('\n---- Huvudmeny ----');
        expect(logs).toContain('Ogiltigt val, försök igen.');
        expect(rl.close).toHaveBeenCalled();
    });

    test('adderar Danne och Bob och kontrollerar listan', (done) => {
        // Simulera inputflödet:
        // Huvudmeny: 1 (Hantera AccountHolder)
        // AccountHolder meny: 1 (Lägg till)
        // Namn: Danne
        // Email: danne@mail.se
        // AccountHolder meny igen: 1 (Lägg till)
        // Namn: BOB
        // Email: BOB@MAIL.SE
        // AccountHolder meny: 0 (Tillbaka)
        // Huvudmeny: 0 (Avsluta)

        rl.question
            .mockImplementationOnce((prompt, cb) => cb('1'))
            .mockImplementationOnce((prompt, cb) => cb('1'))
            .mockImplementationOnce((prompt, cb) => cb('danne'))
            .mockImplementationOnce((prompt, cb) => cb('danne@mail.se'))
            .mockImplementationOnce((prompt, cb) => cb('1'))
            .mockImplementationOnce((prompt, cb) => cb('bob'))
            .mockImplementationOnce((prompt, cb) => cb('bob@mail.se'))
            .mockImplementationOnce((prompt, cb) => cb('0'))
            .mockImplementationOnce((prompt, cb) => cb('0'));

        main.showMainMenu(rl);

        setTimeout(() => {
            const danne = accountMenu.accountHolders.find(h => h.name === 'danne' && h.email === 'danne@mail.se');
            const bob = accountMenu.accountHolders.find(h => h.name === 'bob' && h.email === 'bob@mail.se');

            expect(danne).toBeDefined();
            expect(bob).toBeDefined();
            expect(accountMenu.accountHolders.length).toBe(2);
            done();
        }, 300);
    });
    test('tar bort danne och kontrollerar att endast bob finns kvar', (done) => {
        // Förbered initial data med danne och bob
        accountMenu.accountHolders.length = 0;
        accountMenu.accountHolders.push(
            new (require('../../src/accountHolder'))('danne', 'danne@mail.se'),
            new (require('../../src/accountHolder'))('bob', 'bob@mail.se')
        );

        rl.question
            .mockImplementationOnce((prompt, cb) => cb('1'))  // Huvudmeny: hantera accountholder
            .mockImplementationOnce((prompt, cb) => cb('4'))  // AccountHolder-meny: ta bort
            .mockImplementationOnce((prompt, cb) => cb('1'))  // Ta bort: välj nr 1 (danne)
            .mockImplementationOnce((prompt, cb) => cb('0'))  // Tillbaka i AccountHolder-meny
            .mockImplementationOnce((prompt, cb) => cb('0')); // Avsluta i huvudmeny

        main.showMainMenu(rl);

        setTimeout(() => {
            expect(accountMenu.accountHolders.length).toBe(1);
            const remaining = accountMenu.accountHolders[0];
            expect(remaining.name).toBe('bob');
            expect(remaining.email).toBe('bob@mail.se');
            done();
        }, 300);
    });

});
