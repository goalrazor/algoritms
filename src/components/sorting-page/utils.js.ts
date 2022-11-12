import {TWorkArrayItem} from "./types";

export const swap = (arr: TWorkArrayItem[], i: number, j: number) => {
    let temp = arr[i]
    arr[i] = arr[j];
    arr[j] = temp;
}
