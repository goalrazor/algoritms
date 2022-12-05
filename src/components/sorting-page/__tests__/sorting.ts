import {swap} from "../utils.js";
import {ElementStates} from "../../../types/element-states";
import {TWorkArrayItem} from "../types";
import {sleep} from "../../../utils/utils";
import {DELAY_IN_MS} from "../../../constants/delays";

let emptyArrayStub = [] as unknown as TWorkArrayItem[];
let expectedEmptyArray = [] as unknown as TWorkArrayItem[];
let oneElementArrayStub = [{number: 1, state: ElementStates.Default}];
let expectedOneElementArray = [{number: 1, state: ElementStates.Default}];
let arrayStub = [
    {number: 21, state: ElementStates.Default},
    {number: 1, state: ElementStates.Default},
    {number: 16, state: ElementStates.Default},
    {number: 1, state: ElementStates.Default},
];
let expectedArray = [
    {number: 21, state: ElementStates.Default},
    {number: 16, state: ElementStates.Default},
    {number: 1, state: ElementStates.Default},
    {number: 1, state: ElementStates.Default},
];
beforeEach(() => {
    emptyArrayStub = [];
    oneElementArrayStub = [{number: 1, state: ElementStates.Default}];
    arrayStub = [
        {number: 21, state: ElementStates.Default},
        {number: 1, state: ElementStates.Default},
        {number: 16, state: ElementStates.Default},
        {number: 1, state: ElementStates.Default},
    ];
})

describe("bubble sorting tests", () => {
    it("empty array bubble sort", () => {
        for (let i = 0; i < emptyArrayStub.length; i++) {
            for (let j = 0; j < emptyArrayStub.length - i - 1; j++) {
                emptyArrayStub[j].state = ElementStates.Changing;
                if (emptyArrayStub[j].number < emptyArrayStub[j + 1]?.number) {
                    swap(emptyArrayStub, j, j + 1)
                }
            }
        }
        expect(emptyArrayStub).toStrictEqual(expectedEmptyArray);
    })
    it("one element array bubble sort", () => {
        for (let i = 0; i < oneElementArrayStub.length; i++) {
            for (let j = 0; j < oneElementArrayStub.length - i - 1; j++) {
                oneElementArrayStub[j].state = ElementStates.Changing;
                if (oneElementArrayStub[j].number < oneElementArrayStub[j + 1]?.number) {
                    swap(oneElementArrayStub, j, j + 1)
                }
            }
        }
        expect(oneElementArrayStub).toStrictEqual(expectedOneElementArray);
    })
    it("array bubble sort", () => {
        for (let i = 0; i < arrayStub.length; i++) {
            for (let j = 0; j < arrayStub.length - i - 1; j++) {
                if (arrayStub[j].number < arrayStub[j + 1]?.number) {
                    swap(arrayStub, j, j + 1)
                }
            }
        }
        expect(arrayStub).toStrictEqual(expectedArray);
    })
});

describe("selection sorting tests", () => {
    it("empty array selection sort", () => {
        for (let i = 0; i < emptyArrayStub.length; i++) {
            let min = i;
            for (let j = i + 1; j < emptyArrayStub.length; j++) {
                if (emptyArrayStub[min].number < emptyArrayStub[j].number) {
                    min = j;
                }
            }
            if (min != i) {
                swap(emptyArrayStub, i, min);
            }
        }
        expect(emptyArrayStub).toStrictEqual(expectedEmptyArray);
    })
    it("one element array selection sort", () => {
        for (let i = 0; i < oneElementArrayStub.length; i++) {
            let min = i;
            for (let j = i + 1; j < oneElementArrayStub.length; j++) {
                if (oneElementArrayStub[min].number < oneElementArrayStub[j].number) {
                    min = j;
                }
            }
            if (min != i) {
                swap(oneElementArrayStub, i, min);
            }
        }
        expect(oneElementArrayStub).toStrictEqual(expectedOneElementArray);
    })
    it("array selection sort", () => {
        for (let i = 0; i < arrayStub.length; i++) {
            let min = i;
            for (let j = i + 1; j < arrayStub.length; j++) {
                if (arrayStub[min].number < arrayStub[j].number) {
                    min = j;
                }
            }
            if (min != i) {
                swap(arrayStub, i, min);
            }
        }
        expect(arrayStub).toStrictEqual(expectedArray);
    })
})
