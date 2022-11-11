import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from './string.module.css'
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {TStringField} from "../../types/algorithm";
import {sleep, useForceUpdate} from "../../utils/utils";
import {arrayMoveMutable} from "array-move";
import {DELAY_IN_MS} from "../../constants/delays";

export const StringComponent: React.FC = () => {
        const [isInProgress, setInProgress] = useState(false)
        const [isCirclesShown, setCirclesShown] = useState(false)
        const [value, setValue] = useState('')
        const [valueObject, setValueObject] = useState<TStringField[]>([])
        const forceUpdate = useForceUpdate();

        const algorithm = async (text: TStringField[]) => {
            for (let i = 0, k = text.length - 1; i < k; i++, k--) {
                valueObject[i].state = ElementStates.Changing
                valueObject[k].state = ElementStates.Changing
                forceUpdate()
                await sleep(DELAY_IN_MS);
                arrayMoveMutable(valueObject, i, k)
                arrayMoveMutable(valueObject, k - 1, i)
                valueObject[i].state = ElementStates.Modified
                valueObject[k].state = ElementStates.Modified
                forceUpdate();
            }
            text.forEach((letter, index) => valueObject[index].state = ElementStates.Modified)
            forceUpdate();
        }

        useEffect(() => {
            return () => {
                setCirclesShown(false);
                setValue('')
            }
        }, [])

        useEffect(() => {
            setValueObject(value.split('')
                .reduce<TStringField[]>((acc, letter, currentIndex) => {
                    const state = currentIndex === 0 || currentIndex === value.length - 1 ? ElementStates.Changing : ElementStates.Default
                    return ([...acc, {
                        char: letter,
                        state: state,
                    }])
                }, []))
        }, [value])

        const onSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
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
                    <Button text='Развернуть' type='submit' isLoader={isInProgress} disabled={!value}/>
                </form>
                {isCirclesShown && valueObject.length > 1 ?
                    <div className={styles.circlesWrapper}>
                        {valueObject.map((letter) => {
                            return (
                                <Circle state={letter.state}
                                        extraClass={styles.circle} key={Math.random().toString(36).slice(2)}
                                        letter={letter.char}/>)
                        })}</div> : <></>}
            </SolutionLayout>
        );
    }
;
