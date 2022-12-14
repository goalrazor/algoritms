import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {randomNumArrGenerator, sleep} from "../../utils/utils";
import styles from "./sorting-page.module.css"
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {TWorkArrayItem} from "./types";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {swap} from "./utils.js";

export const SortingPage: React.FC = () => {
    const [workItemArray, setWorkItemArray] = useState<TWorkArrayItem[]>([])
    const [sortType, setSortType] = useState<string>('selection')
    const [isAsc, setAsc] = useState<boolean>(true)
    const [inProgress, setInProgress] = useState<{ ascState: boolean, descState: boolean }>({
        ascState: false,
        descState: false
    })
    const [isDisabled, setDisabled] = useState<boolean>()

    const getRandomArr = () => {
        setWorkItemArray(randomNumArrGenerator(3, 17)
            .reduce<TWorkArrayItem[]>((acc, item) => (
                [...acc, {number: item, state: ElementStates.Default}]), []));
    }

    const handleRadio = (e: ChangeEvent<HTMLInputElement>) => {
        setSortType(e.target.value);
    }

    const bubbleSort = async (arr: TWorkArrayItem[]) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                arr[j].state = ElementStates.Changing;
                if (arr[j + 1]) arr[j + 1].state = ElementStates.Changing;
                setWorkItemArray([...arr]);
                await sleep(DELAY_IN_MS);
                if (isAsc ? arr[j].number < arr[j + 1]?.number : arr[j].number > arr[j + 1]?.number) {
                    swap(arr, j, j + 1)
                }
                arr[j].state = ElementStates.Default;
                if (arr[j + 1]) arr[j + 1].state = ElementStates.Default;
                setWorkItemArray([...arr]);
            }
            arr[arr.length - i - 1].state = ElementStates.Modified;
            setWorkItemArray([...arr]);
        }
        return arr;
    }

    const selectionSort = async (arr: TWorkArrayItem[]) => {
        for (let i = 0; i < arr.length; i++) {
            let min = i;
            arr[min].state = ElementStates.Changing;
            for (let j = i + 1; j < arr.length; j++) {
                arr[j].state = ElementStates.Changing;
                setWorkItemArray([...arr]);
                await sleep(DELAY_IN_MS);
                if (isAsc ? arr[min].number < arr[j].number : arr[min].number > arr[j].number) {
                    min = j;
                }
                arr[j].state = ElementStates.Default;
                setWorkItemArray([...arr]);
            }
            if (min != i) {
                arr[min].state = ElementStates.Modified;
                arr[i].state = ElementStates.Default;
                swap(arr, i, min);
            } else {
                arr[i].state = ElementStates.Modified;
            }
            setWorkItemArray([...arr]);
        }
        return arr;
    }

    useEffect(() => {
        getRandomArr();

        return () => {
            setWorkItemArray([])
        }
    }, []);

    const handleSort = async () => {
        setDisabled(true)
        if (sortType != 'selection') {
            setWorkItemArray(await bubbleSort(workItemArray));
        } else {
            setWorkItemArray(await selectionSort(workItemArray));
        }
        setInProgress({
            ascState: false,
            descState: false,
        })
        setDisabled(false)
    }

    const handleAscendingSort = () => {
        setAsc(true);
        setInProgress({
            ...inProgress,
            ascState: true,
        })
        handleSort()
    }

    const handleDescendingSort = () => {
        setAsc(false);
        setInProgress({
            ...inProgress,
            descState: true,
        })
        handleSort()
    }

    return (
        <SolutionLayout contentClass={styles.wrapper} title="???????????????????? ??????????????">
            <form className={styles.formWrapper}>
                <div className={styles.formItem}>
                    <RadioInput
                        disabled={isDisabled}
                        label="??????????"
                        name={"type"}
                        value={"selection"}
                        defaultChecked
                        extraClass="mr-20"
                        onChange={handleRadio}
                    />
                    <RadioInput
                        disabled={isDisabled}
                        label="??????????????"
                        name={"type"}
                        value={"bubble"}
                        onChange={handleRadio}
                    />
                </div>
                <div className={styles.formItem}>
                    <Button
                        isLoader={inProgress.ascState}
                        disabled={isDisabled}
                        text="???? ??????????????????????"
                        onClick={handleAscendingSort}
                        sorting={Direction.Ascending}
                        extraClass="mr-6"
                    />
                    <Button
                        isLoader={inProgress.descState}
                        disabled={isDisabled}
                        text="???? ????????????????"
                        onClick={handleDescendingSort}
                        sorting={Direction.Descending}
                        extraClass="mr-40"
                    />
                    <Button
                        disabled={isDisabled}
                        text="?????????? ????????????"
                        onClick={getRandomArr}
                    />
                </div>
            </form>
            <ul className={styles.array}>
                {workItemArray.map((item, index) => {
                    return (<Column
                        key={index}
                        index={item.number}
                        state={item.state}
                    />)
                })}
            </ul>
        </SolutionLayout>
    );
};
