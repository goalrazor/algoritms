import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import 'redux-thunk/extend-redux';
import {store} from "../services/store";
import {TAlgorithmActions} from "../services/actions";

type TApplicationActions = TAlgorithmActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = Promise<any> | void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
    >;
