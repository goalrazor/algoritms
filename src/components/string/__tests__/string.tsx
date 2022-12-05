import {reversStringAlgorithm} from "../utils.js";
import {ElementStates} from "../../../types/element-states";
import {TStringField} from "../../../types/algorithm";

describe("string reverse tests", () => {
    it('string reverse with even num of letters', () => {
        const evenStringStub = [
            {char: 'y', state: ElementStates.Default},
            {char: 'a', state: ElementStates.Default},
            {char: 'n', state: ElementStates.Default},
            {char: 'd', state: ElementStates.Default},
            {char: 'e', state: ElementStates.Default},
            {char: 'x', state: ElementStates.Default}
        ]
        const expectedEvenValue =  [
            { char: 'x', state: ElementStates.Default },
            { char: 'e', state: ElementStates.Default },
            { char: 'd', state: ElementStates.Default },
            { char: 'n', state: ElementStates.Default },
            { char: 'a', state: ElementStates.Default },
            { char: 'y', state: ElementStates.Default }
        ]

        for (let i = 0, k = evenStringStub.length - 1; i <= k; i++, k--) {
            reversStringAlgorithm(evenStringStub, i,k);
        }
        expect(evenStringStub).toStrictEqual(expectedEvenValue);
    })
    it('string reverse with odd num of letters', () => {
        const oddStringStub = [
            {char: '1', state: ElementStates.Default},
            {char: '2', state: ElementStates.Default},
            {char: '3', state: ElementStates.Default},
            {char: '4', state: ElementStates.Default},
            {char: '5', state: ElementStates.Default},
        ]
        const expectedOddValue =  [
            { char: '5', state: ElementStates.Default },
            { char: '4', state: ElementStates.Default },
            { char: '3', state: ElementStates.Default },
            { char: '2', state: ElementStates.Default },
            { char: '1', state: ElementStates.Default },
        ]

        for (let i = 0, k = oddStringStub.length - 1; i <= k; i++, k--) {
            reversStringAlgorithm(oddStringStub, i,k);
        }
        expect(oddStringStub).toStrictEqual(expectedOddValue);
    })
    it('string reverse with one letter', () => {
        const oneLetterStub = [
            {char: 'h', state: ElementStates.Default},
        ]
        const expectedOneLetterValue =  [
            { char: 'h', state: ElementStates.Default },
        ]

        for (let i = 0, k = oneLetterStub.length - 1; i <= k; i++, k--) {
            reversStringAlgorithm(oneLetterStub, i,k);
        }
        expect(oneLetterStub).toStrictEqual(expectedOneLetterValue);
    })
    it('string reverse with empty string', () => {
        const oddStringStub = [] as unknown as TStringField[]
        const expectedOddValue =  [] as unknown as TStringField[]

        for (let i = 0, k = oddStringStub.length - 1; i <= k; i++, k--) {
            reversStringAlgorithm(oddStringStub, i,k);
        }
        expect(oddStringStub).toStrictEqual(expectedOddValue);
    })
})
