import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack-page.module.css"
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {TCollectionItem} from "../../utils/implementations/types";
import {sleep} from "../../utils/utils";
import StackCollection from "../../utils/implementations/stackImplementation";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [stackImpl, setStack] = useState(new StackCollection<TCollectionItem>())
  const [inProgress, setInProgress] = useState({add: false, delete: false})
  const [value, setValue] = useState('')

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValue(value)
  }

  const handleAddClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    stackImpl.push({item: value, state: ElementStates.Changing})
    setInProgress({...inProgress, add: true})
    await sleep(SHORT_DELAY_IN_MS);
    stackImpl.peek().state = ElementStates.Default
    setValue('')
    setInProgress({...inProgress, add: false})
  }

  const handleDeleteClick = async () => {
    stackImpl.peek().state = ElementStates.Changing
    setInProgress({...inProgress, delete: true})
    await sleep(SHORT_DELAY_IN_MS);
    stackImpl.peek().state = ElementStates.Default
    stackImpl.pop()
    setInProgress({...inProgress, delete: false})
  }

  const handleClear = () => {
    setStack(new StackCollection())
  }

  useEffect(() => {
    setStack(new StackCollection())
  }, [])

  return (
    <SolutionLayout title="Стек">
      <form className={styles.formWrapper} onSubmit={handleAddClick}>
        <div className={styles.inputWrapper}>
          <Input
              onChange={onChange}
              isLimitText={true}
              maxLength={4}
              value={value}
              extraClass="mr-6"
              disabled={Object.values(inProgress).some(item => item)}
          />
          <Button
              isLoader={inProgress.add}
              type={'submit'}
              text="Добавить"
              disabled={!value.length || Object.values(inProgress).some(item => item)}
              extraClass="mr-6"
          />
          <Button
              text="Удалить"
              isLoader={inProgress.delete}
              onClick={handleDeleteClick}
              disabled={Object.values(inProgress).some(item => item) || !stackImpl.size()}
          />
        </div>
        <Button
            text="Очистить"
            onClick={handleClear}
            disabled={Object.values(inProgress).some(item => item) || !stackImpl.size()}
        />
      </form>
      <ul className={styles.stackVisualizerContainer}>
        {stackImpl.toArray().map((item, index: number) => {
          return (
              <Circle
                  key={index}
                  letter={item.item}
                  index={index}
                  head={stackImpl.size() - 1 === index ? 'top' : ''}
                  state={item?.state}
              />)
        })}
      </ul>
    </SolutionLayout>
  );
};
