import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {ElementStates} from "../../types/element-states";
import styles from "./list-page.module.css"
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {LinkedList} from "../../utils/implementations/linkedList";
import {randomStringArrGenerator, sleep, useForceUpdate} from "../../utils/utils";
import {TCollectionItem} from "../../utils/implementations/types";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";

const MAX_LIST_LENGTH = 6;

type TInButtonsStateType = {
    headAdd: boolean,
    tailAdd: boolean,
    headDelete: boolean,
    tailDelete: boolean,
    addByIndex: boolean,
    deleteByIndex: boolean,
}

export const ListPage: React.FC = () => {
    const [inProgress, setInProgress] = useState<TInButtonsStateType>({
        headAdd: false,
        tailAdd: false,
        headDelete: false,
        tailDelete: false,
        addByIndex: false,
        deleteByIndex: false,
    })
    const [isDisabled, setDisabled] = useState<TInButtonsStateType>({
        headAdd: false,
        tailAdd: false,
        headDelete: false,
        tailDelete: false,
        addByIndex: true,
        deleteByIndex: true,
    })
    const [linkedList, setLinkedList] = useState<LinkedList<string>>(new LinkedList<string>());
    const [value, setValue] = useState('')
    const [currentAddItem, setCurrentAddItem] = useState<boolean[]>([])
    const [currentDeleteItem, setCurrentDeleteItem] = useState<boolean[]>([])
    const [indexValue, setIndexValue] = useState('')
    const [head, setHead] = useState(0)
    const [tail, setTail] = useState(0)
    const forceUpdate = useForceUpdate();
    const [workItemArray, setWorkItemArray] = useState<TCollectionItem[]>([])

    const updateArrayFromLinkedList = (linkedList: LinkedList<string>) => {
        const iterator = linkedList.items();
        const tempArr: TCollectionItem[] = [];
        while (true) {
            const next = iterator.next();
            if (next.done) {
                break;
            }
            tempArr.push({item: next.value.value, state: ElementStates.Default});
        }
        setWorkItemArray(tempArr)
    }

    useEffect(() => {
        const arr = randomStringArrGenerator(3, MAX_LIST_LENGTH, 4, "numeric")
        for (let i = 0; i < arr.length; i++) {
            linkedList.append(arr[i])
        }
        setCurrentAddItem(Array.from({length: arr.length}, () => false));
        setCurrentDeleteItem(Array.from({length: arr.length}, () => false));
        updateArrayFromLinkedList(linkedList)
        setTail(arr.length - 1)
    }, [])

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setValue(value)
    }

    const handleIndexChange = (event: FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        if (Number(value) > workItemArray.length) {
            setDisabled({...isDisabled, addByIndex: true, deleteByIndex: true});
        }
        else {
            setDisabled({...isDisabled, addByIndex: false, deleteByIndex: false});
        }
        setIndexValue(value)
    }

    const handleAddHeadClick = async () => {
        setInProgress(prevState => ({...prevState, headAdd: true}))
        linkedList.prepend(value);
        currentAddItem[head] = true
        await sleep(SHORT_DELAY_IN_MS);
        currentAddItem[head] = false
        workItemArray.unshift({item: value, state: ElementStates.Modified})
        setTail(linkedList.length - 1)
        await sleep(SHORT_DELAY_IN_MS);
        setInProgress(prevState => ({...prevState, headAdd: false}))
        updateArrayFromLinkedList(linkedList)
    }
    const handleAddTailClick = async () => {
        setInProgress(prevState => ({...prevState, tailAdd: true}))
        linkedList.append(value);
        currentAddItem[tail] = true
        await sleep(SHORT_DELAY_IN_MS);
        currentAddItem[tail] = false
        workItemArray.push({item: value, state: ElementStates.Modified})
        setTail(linkedList.length - 1)
        await sleep(SHORT_DELAY_IN_MS);
        setInProgress(prevState => ({...prevState, tailAdd: false}))
        updateArrayFromLinkedList(linkedList)
    }

    const handleDeleteHeadClick = async () => {
        setInProgress(prevState => ({...prevState, headDelete: true}))
        currentDeleteItem[head] = true
        await sleep(SHORT_DELAY_IN_MS);
        workItemArray[head].item = '';
        await sleep(SHORT_DELAY_IN_MS);
        currentDeleteItem[head] = false
        linkedList.shift();
        workItemArray.shift()
        setInProgress(prevState => ({...prevState, headDelete: false}))
        updateArrayFromLinkedList(linkedList)
        setTail(linkedList.length - 1)
    }
    const handleDeleteTailClick = async () => {
        setInProgress(prevState => ({...prevState, tailDelete: true}))
        currentDeleteItem[tail] = true
        await sleep(SHORT_DELAY_IN_MS);
        workItemArray[tail].item = '';
        await sleep(SHORT_DELAY_IN_MS);
        currentDeleteItem[tail] = false
        linkedList.pop()
        workItemArray.pop()
        setInProgress(prevState => ({...prevState, tailDelete: false}))
        updateArrayFromLinkedList(linkedList)
        setTail(linkedList.length - 1)
    }

    const handleClickAddElementByIndex = async () => {
        setInProgress(prevState => ({...prevState, addByIndex: true}))
        linkedList.insert(Number(indexValue), value);
        currentAddItem[head] = true;
        await sleep(SHORT_DELAY_IN_MS);
        forceUpdate()
        for (let i = 0; i < Number(indexValue); i++) {
            if (i + 1) {
                currentAddItem[i + 1] = true;
                currentAddItem[i] = false;
                await sleep(SHORT_DELAY_IN_MS);
                forceUpdate()
            }
            workItemArray[i].state = ElementStates.Changing
            forceUpdate()
            await sleep(SHORT_DELAY_IN_MS);
        }
        workItemArray.splice(Number(indexValue), 0, {item: value, state: ElementStates.Modified})
        currentAddItem[Number(indexValue)] = false;
        forceUpdate()
        await sleep(SHORT_DELAY_IN_MS);
        setInProgress(prevState => ({...prevState, addByIndex: false}))
        updateArrayFromLinkedList(linkedList)
        setTail(linkedList.length - 1)
    }
    const handleClickDeleteElementByIndex = async () => {
        setInProgress(prevState => ({...prevState, deleteByIndex: true}))
        for (let i = 0; i < Number(indexValue); i++) {
            workItemArray[i].state = ElementStates.Changing
            forceUpdate()
            await sleep(DELAY_IN_MS);
        }
        workItemArray[Number(indexValue)] = {item: '', state: ElementStates.Default}
        currentDeleteItem[Number(indexValue)] = true;
        forceUpdate()
        await sleep(SHORT_DELAY_IN_MS)
        workItemArray.splice(Number(indexValue), 1)
        currentDeleteItem[Number(indexValue)] = false;
        linkedList.remove(Number(indexValue))
        setInProgress(prevState => ({...prevState, deleteByIndex: false}))
        updateArrayFromLinkedList(linkedList)
        setTail(linkedList.length - 1)
    }

    const isEndsShown = (compareIndex: number, index: number, arrayOfFlags: boolean[]) => {
        const isCircleShown = arrayOfFlags.findIndex((item) => item);
        if (isCircleShown === compareIndex && compareIndex === index) {
            return false
        }
        return compareIndex === index
    }

    return (
        <SolutionLayout title="Связный список">
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <Input
                    onChange={onChange}
                    placeholder="Введите значение"
                    isLimitText={true}
                    maxLength={4}
                    disabled={Object.values(inProgress).some(item => item)}
                    value={value}
                    extraClass={`${styles.input} mr-6`}
                />
                <div className={styles.buttonsContainer}>
                    <Button
                        text="Добавить в head"
                        extraClass={styles.button}
                        onClick={handleAddHeadClick}
                        isLoader={inProgress.headAdd}
                        disabled={isDisabled.headAdd || !value || Object.values(inProgress).some(item => item)}
                    />
                    <Button
                        text="Добавить в tail"
                        extraClass={styles.button}
                        onClick={handleAddTailClick}
                        isLoader={inProgress.tailAdd}
                        disabled={isDisabled.tailAdd || !value || Object.values(inProgress).some(item => item)}
                    />
                    <Button
                        text="Удалить из head"
                        extraClass={styles.button}
                        onClick={handleDeleteHeadClick}
                        isLoader={inProgress.headDelete}
                        disabled={Object.values(inProgress).some(item => item)}
                    />
                    <Button
                        text="Удалить из tail"
                        extraClass={styles.button}
                        onClick={handleDeleteTailClick}
                        isLoader={inProgress.tailDelete}
                        disabled={Object.values(inProgress).some(item => item)}
                    />
                </div>
            </form>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <Input
                    onChange={handleIndexChange}
                    type="number"
                    disabled={Object.values(inProgress).some(item => item)}
                    value={indexValue}
                    placeholder="Введите индекс"
                    extraClass={`${styles.input} mr-6`}
                />
                <div className={styles.buttonsContainer}>
                    <Button
                        text="Добавить по индексу"
                        extraClass={`${styles.buttonL} mr-6`}
                        onClick={handleClickAddElementByIndex}
                        isLoader={inProgress.addByIndex}
                        disabled={isDisabled.addByIndex || !indexValue || !value || Object.values(inProgress).some(item => item)}
                    />
                    <Button
                        text="Удалить по индексу"
                        extraClass={`${styles.buttonL}`}
                        onClick={handleClickDeleteElementByIndex}
                        isLoader={inProgress.deleteByIndex}
                        disabled={isDisabled.deleteByIndex || !indexValue || Object.values(inProgress).some(item => item)}
                    />
                </div>
            </form>
            <ul className={styles.list}>
                {workItemArray.map((item, index) => {
                    return (
                        <li className={styles.item} key={index}>
                            {currentAddItem.map(() => {
                                return (
                                    <div key={Math.random().toString(36).slice(2)}>
                                        {currentAddItem[index] &&
                                            <Circle
                                                extraClass={`${styles.currentItemCircle} ${styles.addAction}`}
                                                letter={value}
                                                state={ElementStates.Changing}
                                                isSmall
                                            />}
                                        {currentDeleteItem[index] &&
                                            <Circle
                                                extraClass={`${styles.currentItemCircle} ${styles.removeAction}`}
                                                letter={linkedList.get(index)?.value}
                                                state={ElementStates.Changing}
                                                isSmall
                                            />}
                                    </div>
                                )
                            })}
                            <Circle
                                letter={item.item}
                                index={index}
                                head={isEndsShown(head, index, currentAddItem) ? 'head' : ''}
                                tail={isEndsShown(tail, index, currentDeleteItem) ? 'tail' : ''}
                                isSmall={false}
                                state={item.state}
                                extraClass="mr-12"
                            />
                            {index < workItemArray.length - 1 &&
                                <ArrowIcon/>}
                        </li>)
                })}
            </ul>
        </SolutionLayout>
    );
};
