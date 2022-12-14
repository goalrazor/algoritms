import React, {ChangeEvent, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../stack-page/stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {TCollectionItem} from "../../utils/implementations/types";
import QueueCollection from "../../utils/implementations/queueImplementation";
import {ElementStates} from "../../types/element-states";
import {sleep} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

const MAX_QUEUE_LENGTH = 7;

export const QueuePage: React.FC = () => {
    const [queue, setQueue] = useState(new QueueCollection<string>(MAX_QUEUE_LENGTH))
    const [circlesArr, setCirclesArray] = useState<TCollectionItem[]>(Array.from(Array<TCollectionItem>(MAX_QUEUE_LENGTH), () => {
        return {item: '', state: ElementStates.Default};
    }))
    const [inProgress, setInProgress] = useState(false)
    const [value, setValue] = useState('')
    const [head, setHead] = useState(0)
    const [tail, setTail] = useState(0)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setValue(value)
    }

    const handleAddClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (tail <= MAX_QUEUE_LENGTH) {
            queue.enqueue(value)
            const tailPosition = queue.size() > 1 ? tail + 1 : head
            circlesArr[tailPosition].state = ElementStates.Changing
            setInProgress(true)
            await sleep(SHORT_DELAY_IN_MS);
            circlesArr[tailPosition] = {item: value, state: ElementStates.Default}
            setTail(queue.size() > 1 ? tail + 1 : head);
            setValue('');
            setInProgress(false);
        }
    }

    const handleDeleteClick = async () => {
        if (head < MAX_QUEUE_LENGTH) {
            circlesArr[head].state = ElementStates.Changing
            setInProgress(true)
            await sleep(SHORT_DELAY_IN_MS)
            queue.dequeue()
            circlesArr[head] = {item: '', state: ElementStates.Default}
            setHead(head + 1)
            setInProgress(false)
        } else {
            setHead(MAX_QUEUE_LENGTH)
        }
    }

    const handleClear = () => {
        queue.clear()
        setHead(0);
        setTail(0);
        setCirclesArray((Array.from(Array<TCollectionItem>(MAX_QUEUE_LENGTH), () => {
            return {item: '', state: ElementStates.Default};
        })))
    }

    return (
        <SolutionLayout title="??????????????">
            <form className={styles.formWrapper} onSubmit={handleAddClick}>
                <div className={styles.inputWrapper}>
                    <Input
                        onChange={onChange}
                        isLimitText={true}
                        maxLength={4}
                        value={value}
                        extraClass="mr-6"
                        disabled={inProgress || tail >= MAX_QUEUE_LENGTH}
                    />
                    <Button
                        isLoader={inProgress}
                        type={'submit'}
                        text="????????????????"
                        disabled={!value.length || tail > MAX_QUEUE_LENGTH}
                        extraClass="mr-6"
                    />
                    <Button
                        text="??????????????"
                        onClick={handleDeleteClick}
                        disabled={inProgress || !queue.size()}
                    />
                </div>
                <Button
                    text="????????????????"
                    onClick={handleClear}
                    disabled={!queue.size() && (head > MAX_QUEUE_LENGTH || head === 0)}
                />
            </form>
            <ul className={styles.stackVisualizerContainer}>
                {circlesArr.map((item, index: number) => {
                    return (
                        <Circle
                            key={index}
                            letter={item.item}
                            index={index}
                            head={queue.size() ? head === index ? 'head' : '' : ''}
                            tail={queue.size() ? tail === index ? 'tail' : '' : ''}
                            state={item.state}
                        />)
                })}
            </ul>
        </SolutionLayout>
    );
};
