import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { sleep } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputNumber, setInputNumber] = useState<string | number>("");
  const [fibonacciArr, setFibonacciArr] = useState<Array<number>>([]);

  const createSequence = async () => {
    setIsLoading(true);
    let sequenceArr = [0];
    setFibonacciArr([...sequenceArr]);
    await sleep(SHORT_DELAY_IN_MS);
    sequenceArr.push(1);
    setFibonacciArr([...sequenceArr]);
    await sleep(SHORT_DELAY_IN_MS);
    for (let i = 2; i <= inputNumber; i++) {
      sequenceArr[i] = sequenceArr[i - 1] + sequenceArr[i - 2];
      setFibonacciArr([...sequenceArr]);
      await sleep(SHORT_DELAY_IN_MS);
    }
    setIsLoading(false);
  };

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createSequence();
    setInputNumber("");
  };
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fibLength = Number(e.target.value);
    if (fibLength < 1 || fibLength > 19) {
      setInputNumber("");
    } else {
      setInputNumber(fibLength);
    }
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.contentBox}>
        <Input
          extraClass="mr-6"
          placeholder="Введите число от 1 до 19"
          max={19}
          isLimitText={true}
          value={inputNumber}
          onChange={handlerChange}
          type="number"
          min={1}
        ></Input>
        <Button
          onClick={handlerClick}
          text="Сгенерировать"
          isLoader={isLoading}
          disabled={!(inputNumber > 0 && inputNumber < 20)}
        />
      </div>
      {fibonacciArr.length > 0 && (
        <>
          <div className={styles.circleBox}>
            {fibonacciArr.slice(0, 10).map((el, index) => (
              <Circle
                letter={String(el)}
                index={index}
                extraClass="mr-8"
                key={index}
              />
            ))}
          </div>
          <div className={styles.circleBox}>
            {fibonacciArr.slice(10, 20).map((el, index) => (
              <Circle
                letter={String(el)}
                index={10 + index}
                extraClass="mr-8"
                key={index}
              />
            ))}
          </div>
        </>
      )}
    </SolutionLayout>
  );
};
