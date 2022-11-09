import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../string/string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {useDispatch, useForceUpdate} from "../../services/hooks";
import {clearWorkFieldAction, dispatchNumDataAction} from "../../services/actions";
import {sleep} from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
    const [isInProgress, setInProgress] = useState(false)
    const [isCirclesShown, setCirclesShown] = useState(false)
    const [isDisabled, setDisabled] = useState(false)
    const [value, setValue] = useState('')
    const [array, setArray] = useState<number[]>([])
    const dispatch = useDispatch();
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        return () => {
            dispatch(clearWorkFieldAction())
            setCirclesShown(false);
            setValue('')
        }
    }, [])

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        setDisabled(Number(value) > 19);
        setValue(value)
    }

    const fib = (n: number): number[] => {
        let arr: number[] = [0, 1];
        if (n === 0) return [0];
        for (let i = 2; i < n + 1; i++) {
            arr.push(arr[i - 2] + arr[i - 1]);
        }
        return arr
    }

    const addToRenderArray = async () => {
        const temp: number[] = [];
        const fibonacci = fib(Number(value));
        for (const num of fibonacci) {
            temp.push(num);
            setArray(temp);
            forceUpdate();
            await sleep(500);
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(dispatchNumDataAction(Number(value)));
        setInProgress(true);
        setCirclesShown(true);
        addToRenderArray().then(() => setInProgress(false));
    }

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form className={styles.stringWrapper} onSubmit={onSubmit}>
                <Input placeholder={"Введите целое неотрицательное число"} extraClass={styles.input} type={'number'}
                       max={19} isLimitText={true} onChange={onChange}/>
                <Button text='Рассчитать' type='submit' isLoader={isInProgress} disabled={isDisabled}/>
            </form>
            {isCirclesShown && array.length ?
                <div className={styles.circlesWrapper}>
                    {array.map((num, index) => {
                        return (
                            <Circle index={index}
                                    extraClass={styles.circle} key={Math.random().toString(36).slice(2)}
                                    letter={String(num)}/>)
                    })}</div> : <></>}
        </SolutionLayout>
    );
};
