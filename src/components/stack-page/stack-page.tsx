import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { Stack } from "../../utils/structures/stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useState } from "react";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputLetter, setInputLetter] = useState<string>("");
  const [stack, setStack] = useState<Stack<string>>(new Stack());
  const [stackArr, setStackArr] = useState<Array<string>>([]);
  
  const handlerClickAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (inputLetter !== "") {
      stack.push(inputLetter);
      setStack(stack);
      setStackArr(stack.innerArr());
    }
    setInputLetter("");
    await sleep(SHORT_DELAY_IN_MS);
    setIsLoading(false);
  };
  const handlerClickDel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    await sleep(SHORT_DELAY_IN_MS);
    stack.pop();
    setStack(stack);
    setStackArr([...stack.innerArr()]);
    setIsLoading(false);
  };
  const handlerClickClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setStack(new Stack());
    setStackArr([]);
    setIsLoading(false);
  };
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;
    setInputLetter(inputValue);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.contentBox}>
        <Input
          extraClass={styles.letterInput}
          placeholder="Введите символ"
          maxLength={4}
          isLimitText={true}
          value={inputLetter}
          onChange={handlerChange}
          min={1}
        ></Input>
        <Button
          onClick={handlerClickAdd}
          text="Добавить"
          isLoader={isLoading}
          disabled={inputLetter.length === 0}
        />
        <Button
          onClick={handlerClickDel}
          text="Удалить"
          isLoader={isLoading}
          disabled={stackArr.length === 0}
        />
        <Button
          onClick={handlerClickClear}
          text="Очистить"
          isLoader={isLoading}
          extraClass={styles.clearButton}
          disabled={stackArr.length === 0}
        />
      </div>
      <div className={styles.circleBox}>
        {stackArr.map((el, index) => (
          <Circle
            letter={el}
            index={index}
            extraClass="mr-8"
            key={index}
            head={index == stack.getSize() - 1 ? "top" : ""}
            state={
              isLoading && index == stack.getSize() - 1
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
