import { deepEqual, throws } from 'assert/strict';

import { describe, it } from 'mocha';
import { computerNextStep, computerAllSteps } from '../src/Turing.js';

describe('Times Four', () => {
    let timesFourRules = [
        ['Scan', '0', '0', 'R', 'Scan'],
        ['Scan', '1', '1', 'R', 'Scan'],
        ['Scan', '#', '0', 'R', 'Adding'],
        ['Adding', '#', '0', 'R', 'Halt'],
    ];
    it('Next Step: Works for "1010"', () => {
        let test = computerNextStep(timesFourRules, '1010');
        deepEqual(test.next(), {
            value: [['1', '0', '1', '0'], 0, 'Scan'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '0'], 1, 'Scan'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '0'], 2, 'Scan'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '0'], 3, 'Scan'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '0', '#'], 4, 'Scan'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '0', '0', '#'], 5, 'Adding'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '0', '0', '0', '#'], 6, 'Halt'],
            done: false,
        });
        deepEqual(test.next(), { value: undefined, done: true });
    });

    it('All Steps: Works for "1010"', () => {
        deepEqual(computerAllSteps(timesFourRules, '1010'), 8);
    });

    it('Next Step: Works for "1"', () => {
        let test = computerNextStep(timesFourRules, '1');
        deepEqual(test.next(), {
            value: [['1'], 0, 'Scan'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '#'], 1, 'Scan'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '#'], 2, 'Adding'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '0', '#'], 3, 'Halt'],
            done: false,
        });
        deepEqual(test.next(), { value: undefined, done: true });
    });

    it('All Steps: Works for "1"', () => {
        deepEqual(computerAllSteps(timesFourRules, '1'), 5);
    });
});

describe('Even Test', () => {
    let evenTestRules = [
        ['S', '0', '0', 'R', 'S'],
        ['S', '1', '1', 'R', 'S'],
        ['S', '#', '#', 'L', 'End'],
        ['End', '0', '0', 'R', 'Accept'],
        ['End', '1', '1', 'R', 'Reject'],
        ['End', '#', '#', 'R', 'Reject'],
    ];

    it('Next Step: Works for "101"', () => {
        let test = computerNextStep(evenTestRules, '101');
        deepEqual(test.next(), {
            value: [['1', '0', '1'], 0, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1'], 1, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1'], 2, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '#'], 3, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '#'], 2, 'End'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '#'], 3, 'Reject'],
            done: false,
        });
        deepEqual(test.next(), { value: undefined, done: true });
    });

    it('All Steps: Works for "101"', () => {
        deepEqual(computerAllSteps(evenTestRules, '101'), 7);
    });

    it('Next Step: Works for "100"', () => {
        let test = computerNextStep(evenTestRules, '100');
        deepEqual(test.next(), {
            value: [['1', '0', '0'], 0, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '0'], 1, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '0'], 2, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '0', '#'], 3, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '0', '#'], 2, 'End'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '0', '#'], 3, 'Accept'],
            done: false,
        });
        deepEqual(test.next(), { value: undefined, done: true });
    });

    it('All Steps: Works for "100"', () => {
        deepEqual(computerAllSteps(evenTestRules, '100'), 7);
    });
});

describe('Incrementer Test', () => {
    let incrementerRules = [
        ['S', '0', '0', 'R', 'S'],
        ['S', '1', '1', 'R', 'S'],
        ['S', '#', '#', 'L', 'B'],
        ['B', '1', '0', 'L', 'B'],
        ['B', '0', '1', 'L', 'H'],
        ['B', '#', '#', 'L', 'H'],
    ];

    it('Next Step: Workd for "101"', () => {
        let test = computerNextStep(incrementerRules, '101');
        deepEqual(test.next(), {
            value: [['1', '0', '1'], 0, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1'], 1, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1'], 2, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '#'], 3, 'S'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '1', '#'], 2, 'B'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '0', '0', '#'], 1, 'B'],
            done: false,
        });
        deepEqual(test.next(), {
            value: [['1', '1', '0', '#'], 0, 'H'],
            done: false,
        });
        deepEqual(test.next(), { value: undefined, done: true });
    });

    it('All Steps: Works for "101"', () => {
        deepEqual(computerAllSteps(incrementerRules, '101'), 8);
    });
});
