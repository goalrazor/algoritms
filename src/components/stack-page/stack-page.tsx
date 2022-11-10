import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack-page.module.css"
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {TStackItem} from "./types";
import {sleep} from "../../utils/utils";
import Stack from "./stackImplementation";

export const StackPage: React.FC = () => {
  const [stackImpl, setStack] = useState(new Stack<TStackItem>())
  const [inProgress, setInProgress] = useState(false)
  const [value, setValue] = useState('')

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    setValue(value)
  }

  const handleAddClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    stackImpl.push({item: value, state: ElementStates.Changing})
    setInProgress(true)
    await sleep(500);
    stackImpl.peek().state = ElementStates.Default
    setValue('')
    setInProgress(false)
  }

  const handleDeleteClick = async () => {
    stackImpl.peek().state = ElementStates.Changing
    setInProgress(true)
    await sleep(500);
    stackImpl.peek().state = ElementStates.Default
    stackImpl.pop()
    setInProgress(false)
  }

  const handleClear = () => {
    setStack(new Stack())
  }

  useEffect(() => {
    setStack(new Stack())
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
          />
          <Button
              isLoader={inProgress}
              type={'submit'}
              text="Добавить"
              disabled={!value.length}
              extraClass="mr-6"
          />
          <Button
              isLoader={inProgress}
              text="Удалить"
              onClick={handleDeleteClick}
              disabled={false}
          />
        </div>
        <Button
            isLoader={inProgress}
            text="Очистить"
            onClick={handleClear}
            disabled={false}
        />
      </form>
      <ul className={styles.stackVisualizerContainer}>
        {stackImpl.map((item, index: number) => {
          return (
              <Circle
                  key={index}
                  letter={item.item}
                  index={index}
                  head={stackImpl.size() - 1 === index ? 'top' : ''}
                  state={item.state}
              />)
        })}
      </ul>
    </SolutionLayout>
  );
};
