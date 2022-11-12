import {arrayMoveMutable} from "array-move";
import {TStringField} from "../../types/algorithm";

export const reversStringAlgorithm = (valueObject: TStringField[], i: number, k: number) => {
    arrayMoveMutable(valueObject, i, k)
    if (valueObject[k - 1]) arrayMoveMutable(valueObject, k - 1, i)
}
