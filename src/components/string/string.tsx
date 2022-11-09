import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css'
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {TStringField} from "../../types/algorithm";
import {useDispatch, useSelector} from "../../services/hooks";
import {
    changeCharStatus,
    clearWorkFieldAction,
    dispatchStringDataAction,
    moveCharAction
} from "../../services/actions";
import {sleep} from "../../utils/utils";

export const StringComponent: React.FC = () => {
        const [isInProgress, setInProgress] = useState(false)
        const [isCirclesShown, setCirclesShown] = useState(false)
        const [value, setValue] = useState('')
        const dispatch = useDispatch();
        const workField = useSelector(store => store.algorithmReducer.workField as TStringField[])

        const valueObject = value.split('')
            .reduce<TStringField[]>((acc, letter, currentIndex) => {
                const state = currentIndex === 0 || currentIndex === value.length - 1 ? ElementStates.Changing : ElementStates.Default
                return (
                    [...acc,
                        {
                            char: letter,
                            state: state,
                        }])
            }, []);

        const algorithm = async (text: TStringField[]) => {
            for (let i = 0, k = text.length - 1; i < k; i++, k--) {
                dispatch(changeCharStatus(i, ElementStates.Changing))
                dispatch(changeCharStatus(k, ElementStates.Changing))
                await sleep(1000);
                dispatch(moveCharAction(i, k, ElementStates.Modified))
                dispatch(moveCharAction(k - 1, i, ElementStates.Modified))
            }
            text.forEach((letter, index) => dispatch(changeCharStatus(index, ElementStates.Modified)))
        }

        useEffect(() => {
            return () => {
                dispatch(clearWorkFieldAction())
                setCirclesShown(false);
                setValue('')
            }
        }, [])


        const onSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            dispatch(dispatchStringDataAction(valueObject));
            setInProgress(true);
            setCirclesShown(true);
            algorithm(valueObject)
                .then(() => {
                setInProgress(false);
            })
        }


        const onChange = (event: FormEvent<HTMLInputElement>) => {
            setValue((event.target as HTMLInputElement).value)
        }

        return (
            <SolutionLayout title="Строка">
                <form className={styles.stringWrapper} onSubmit={onSubmit}>
                    <Input extraClass={styles.input} maxLength={11} isLimitText={true} onChange={onChange}/>
                    <Button text='Развернуть' type='submit' isLoader={isInProgress}/>
                </form>
                {isCirclesShown && workField.length > 1 ?
                    <div className={styles.circlesWrapper}>
                        {workField.map((letter) => {
                            return (
                                <Circle state={letter.state}
                                        extraClass={styles.circle} key={Math.random().toString(36).slice(2)}
                                        letter={letter.char}/>)
                        })}</div> : <></>}
            </SolutionLayout>
        );
    }
;
