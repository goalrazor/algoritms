import {TStringField} from "../../types/algorithm";
import {TAlgorithmActions} from "../actions";
import {arrayMoveImmutable} from 'array-move';

type TAlgorithmState = {
    workField: Array<TStringField> | number,
}

const initialState = {
    workField: [],
}

export const algorithmReducer = (state: TAlgorithmState = initialState, action: TAlgorithmActions): TAlgorithmState => {
    switch (action.type) {
        case "CLEAR": {
            return initialState;
        }
        case "GET_NUM_DATA": {
            return {
                ...state,
                workField: action.workField,
            }
        }
        case "GET_STRING_DATA": {
            return {
                ...state,
                workField: action.workField,
            }
        }
        case "CHANGE_CHAR_STATE": {
            return {
                ...state,
                workField: [...state.workField as Array<TStringField>]
                    .map((letter, index) =>
                        (index === action.index ? {char: letter.char, state: action.status} : letter)),
            }
        }
        case "MOVE_CHAR": {
            const newWorkField = arrayMoveImmutable(state.workField as Array<TStringField>, action.fromIndex, action.toIndex)
                .reduce<Array<TStringField>>((acc, letter, currentIndex) => {
                    if (currentIndex === action.toIndex) {
                        letter.state = action.status
                    }
                    return [
                        ...acc,
                        letter
                    ]
                }, [])
            return {
                ...state,
                workField: newWorkField,
            }
        }
        default: {
            return state;
        }
    }
}

