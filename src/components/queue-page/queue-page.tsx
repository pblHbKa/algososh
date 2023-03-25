import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { useState } from "react";
import { Queue } from "../../utils/structures/queue";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputLetter, setInputLetter] = useState<string>("");
  const [queue, setQueue] = useState<Queue<string>>(new Queue(7));
  const [queueArr, setQueueArr] = useState<Array<string | null>>([
    ...queue.innerArr(),
  ]);
  const [changingEl, setChangingEl] = useState<number>(-1);

  const handlerClickAdd = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (inputLetter !== "") {
      queue.enqueue(inputLetter);
      setQueue(queue);
      setChangingEl(queue.pointers().tail);
      setQueueArr([...queue.innerArr()]);
      await sleep(SHORT_DELAY_IN_MS);
      setChangingEl(-1);
    }
    setInputLetter("");
    await sleep(SHORT_DELAY_IN_MS);
    setIsLoading(false);
  };
  const handlerClickDel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setChangingEl(queue.pointers().head);
    await sleep(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setQueue(queue);
    setQueueArr([...queue.innerArr()]);
    setChangingEl(-1);
    setIsLoading(false);
  };
  const handlerClickClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsLoading(true);
    e.preventDefault();
    setQueue(new Queue<string>(7));
    setQueueArr([...queue.innerArr()]);
    setIsLoading(false);
  };
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLetter(e.target.value);
  };

  return (
    <SolutionLayout title="Очередь">
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
          disabled={queue.isEmpty()}
        />
        <Button
          onClick={handlerClickClear}
          text="Очистить"
          isLoader={isLoading}
          extraClass={styles.clearButton}
          disabled={queue.isEmpty()}
        />
      </div>
      <div className={styles.circleBox}>
        {queueArr.map((el, index) => (
          <Circle
            letter={typeof el === "string" ? el : ""}
            index={index}
            extraClass="mr-8"
            key={index}
            head={index === queue.pointers().head ? "head" : ""}
            tail={index === queue.pointers().tail ? "tail" : ""}
            state={
              isLoading && index === changingEl
                ? ElementStates.Changing
                : ElementStates.Default
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
