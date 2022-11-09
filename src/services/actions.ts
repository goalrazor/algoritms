import {TStringField} from "../types/algorithm";
import {ElementStates} from "../types/element-states";

export const GET_STRING_DATA: "GET_STRING_DATA" = "GET_STRING_DATA";
export const GET_NUM_DATA: "GET_NUM_DATA" = "GET_NUM_DATA";
export const MOVE_CHAR: "MOVE_CHAR" = "MOVE_CHAR";
export const CHANGE_CHAR_STATE: "CHANGE_CHAR_STATE" = "CHANGE_CHAR_STATE";
export const CLEAR: 'CLEAR' = 'CLEAR';

export interface IGetStringDataAction {
    readonly type: typeof GET_STRING_DATA;
    workField: Array<TStringField>;
}

export interface IGetNumDataAction {
    readonly type: typeof GET_NUM_DATA;
    workField: number;
}

export interface IMoveCharAction {
    readonly type: typeof MOVE_CHAR;
    fromIndex: number;
    toIndex: number;
    status: ElementStates;
}

export interface IClearAction {
    readonly type: typeof CLEAR;
}

export interface IChangeCharState {
    readonly type: typeof CHANGE_CHAR_STATE;
    index: number;
    status: ElementStates;
}
export const dispatchStringDataAction = (string: TStringField[]): IGetStringDataAction => ({
    type: GET_STRING_DATA,
    workField: string
});

export const dispatchNumDataAction = (number: number): IGetNumDataAction => ({
    type: GET_NUM_DATA,
    workField: number
});


export const moveCharAction = (fromIndex: number, toIndex: number, status: ElementStates): IMoveCharAction => ({
    type: MOVE_CHAR,
    fromIndex,
    toIndex,
    status
});

export const changeCharStatus = (index: number, status: ElementStates): IChangeCharState => ({
    type: CHANGE_CHAR_STATE,
    index,
    status
})


export const clearWorkFieldAction = (): IClearAction => ({
    type: CLEAR,
});

export type TAlgorithmActions = IClearAction | IGetNumDataAction | IGetStringDataAction | IMoveCharAction | IChangeCharState;


