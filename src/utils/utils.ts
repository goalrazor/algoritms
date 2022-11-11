import cryptoRandomString from "crypto-random-string";
import {useState} from "react";

type TStringGeneratorType = undefined | 'hex' | 'base64' | 'url-safe' | 'numeric' | 'distinguishable' | 'ascii-printable' | 'alphanumeric';


export const sleep = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

export const randomNumArrGenerator = (minArrayLength: number, maxArrayLength: number) => {
    const N =  randomIntFromInterval(minArrayLength, maxArrayLength)
    return (Array.from({length: N}, () => Math.floor(Math.random() * 100) + 1))
}

export const randomStringArrGenerator = (minArrayLength: number, maxArrayLength: number, maxStrLength: number, type: TStringGeneratorType = undefined) => {
    const arrayLength = randomIntFromInterval(minArrayLength, maxArrayLength);
    const result = []
    for (let i = 1; i < arrayLength; i++) {
        const stringLength = randomIntFromInterval(1, maxStrLength);
        result.push(cryptoRandomString({length: stringLength, type}));
    }
    return result;
}

export function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}
