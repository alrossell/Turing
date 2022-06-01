export function computerAllSteps(rules, input) {
    const turing = computerNextStep(rules, input);
    let checker;
    let steps = 0;
    const maxStepCount = 100000;
    do {
        checker = turing.next();
        steps += 1;
        if (steps >= maxStepCount) {
            alert('Either it has a lot of steps or my code has a bug in it');
            return -1;
        }
    } while (!checker.done);

    return steps;
}

export function listAllSteps(currRules, input) {
    const turing = computerNextStep(currRules, input);

    let tapes = [];
    let rules = [];

    const indexes = [];

    let currentState;

    do {
        currentState = turing.next();

        if (!currentState.done) {
            //Change this
            let newTapes = JSON.parse(JSON.stringify(tapes));
            newTapes.push(currentState.value.tape);
            tapes = newTapes;

            let newRules = JSON.parse(JSON.stringify(rules));
            newRules.push(currentState.value.rule);
            rules = newRules;

            indexes.push(currentState.value.index);
        }
    } while (!currentState.done);

    return { rules: rules, indexes: indexes, tapes: tapes };
}

export function* computerNextStep(rules, input) {
    let tape = input.split('');
    let control = {};
    let currStep = null;
    // Javascript can't get the lenght for tape inside of the loop
    let arrLength = tape.length;

    let currState, currSymbol, newSymbol, move, nextState;
    for (let rule of rules) {
        [currState, currSymbol, newSymbol, move, nextState] = rule;

        if (currStep === null) {
            currStep = currState;
        }
        control[[currState, currSymbol]] = [newSymbol, move, nextState];
    }
    let index = 0;

    while (true) {
        if (!([currStep, tape[index]] in control)) {
            break;
        } else {
            yield {
                rule: [
                    currStep,
                    tape[index],
                    ...control[[currStep, tape[index]]],
                ],
                index: index,
                tape: tape,
            };
        }

        [newSymbol, move, currStep] = control[[currStep, tape[index]]];
        tape[index] = newSymbol;

        move === 'R' ? (index += 1) : (index -= 1);

        if (index < 0) {
            tape.unshift('#');
            arrLength += 1;
            index += 1;
        } else if (index >= arrLength) {
            tape.push('#');
            arrLength += 1;
        }
    }
}
