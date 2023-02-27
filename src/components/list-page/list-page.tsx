import React, { useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { useState } from "react";
import { LinkedList } from "../../utils/structures/list";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputLetter, setInputLetter] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [list, setList] = useState<LinkedList<string>>(new LinkedList());
  const [listArr, setListArr] = useState<Array<string>>([]);
  const [modifiedIndex, setModifiedIndex] = useState<number>(-1);
  const [addIndex, setAddIndex] = useState<number>(-1);
  const [deleteIndex, setDeleteIndex] = useState<number>(-1);
  const [deleteElFound, setDeleteElFound] = useState<boolean>(false);

  useEffect(() => {
    list.append("0");
    list.append("34");
    list.append("8");
    list.append("1");
    setList(list);
    setListArr(list.innerArr());
  }, []);

  const handlerChangeLetter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputLetter(e.target.value);
  };
  const handlerChangeIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.target.value));
  };
  const handlerClickAddHead = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    setAddIndex(0);
    await sleep(DELAY_IN_MS);
    setAddIndex(-1);
    list.insertAt(inputLetter, 0);
    setList(list);
    setListArr([...list.innerArr()]);
    setModifiedIndex(0);
    await sleep(DELAY_IN_MS);
    setModifiedIndex(-1);
    setIsLoading(false);
  };
  const handlerClickAddTail = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    setAddIndex(list.getSize() - 1);
    await sleep(DELAY_IN_MS);
    setAddIndex(-1);
    list.append(inputLetter);
    setList(list);
    setListArr([...list.innerArr()]);
    setModifiedIndex(list.getSize() - 1);
    await sleep(DELAY_IN_MS);
    setModifiedIndex(-1);
    setIsLoading(false);
  };
  const handlerClickDelHead = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    setDeleteIndex(0);
    await sleep(DELAY_IN_MS);
    setDeleteElFound(true);
    await sleep(DELAY_IN_MS);
    setDeleteIndex(-1);
    setDeleteElFound(false);
    list.deleteAt(0);
    setList(list);
    setListArr([...list.innerArr()]);
    setIsLoading(false);
  };
  const handlerClickDelTail = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    setDeleteIndex(list.getSize() - 1);
    await sleep(DELAY_IN_MS);
    setDeleteElFound(true);
    await sleep(DELAY_IN_MS);
    setDeleteIndex(-1);
    setDeleteElFound(false);
    list.delete();
    setList(list);
    setListArr([...list.innerArr()]);
    setIsLoading(false);
  };
  const handlerClickAddIndex = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    for (let i = 0; i <= inputIndex; i++) {
      setAddIndex(i);
      await sleep(DELAY_IN_MS);
    }
    setAddIndex(-1);
    list.insertAt(inputLetter, inputIndex);
    setList(list);
    setListArr([...list.innerArr()]);
    setModifiedIndex(inputIndex);
    await sleep(DELAY_IN_MS);
    setModifiedIndex(-1);
    setIsLoading(false);
  };
  const handlerClickDelIndex = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    for (let i = 0; i <= inputIndex; i++) {
      setDeleteIndex(i);
      await sleep(DELAY_IN_MS);
    }
    setDeleteElFound(true);
    await sleep(DELAY_IN_MS);
    setDeleteIndex(-1);
    setDeleteElFound(false);

    list.deleteAt(inputIndex);
    setList(list);
    setListArr([...list.innerArr()]);
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.contentBox}>
        <Input
          extraClass={styles.letterInput}
          placeholder="Введите значение"
          maxLength={4}
          isLimitText={true}
          value={inputLetter}
          onChange={handlerChangeLetter}
        ></Input>
        <Button
          onClick={handlerClickAddHead}
          text="Добавить в head"
          isLoader={isLoading}
        />
        <Button
          onClick={handlerClickAddTail}
          text="Добавить в tail"
          isLoader={isLoading}
        />
        <Button
          onClick={handlerClickDelHead}
          text="Удалить из head"
          isLoader={isLoading}
          extraClass={styles.clearButton}
        />
        <Button
          onClick={handlerClickDelTail}
          text="Удалить из tail"
          isLoader={isLoading}
        />
      </div>
      <div className={styles.contentBox}>
        <Input
          extraClass={styles.letterInput}
          placeholder="Введите индекс"
          value={inputIndex}
          onChange={handlerChangeIndex}
          type="number"
          min={0}
        ></Input>
        <Button
          onClick={handlerClickAddIndex}
          text="Добавить по индексу"
          isLoader={isLoading}
          extraClass={styles.bigButton}
        />
        <Button
          onClick={handlerClickDelIndex}
          text="Удалить по индексу"
          isLoader={isLoading}
          extraClass={styles.bigButton2}
        />
      </div>
      <div className={styles.circleBox}>
        {listArr.map((el, index) => (
          <>
            <Circle
              letter={deleteElFound && index === deleteIndex ? "" : el}
              index={index}
              key={index}
              head={
                index === addIndex ? (
                  <Circle
                    letter={inputLetter}
                    key={"head"}
                    isSmall
                    state={ElementStates.Changing}
                  />
                ) : index === 0 ? (
                  "head"
                ) : (
                  ""
                )
              }
              tail={
                index === deleteIndex && deleteElFound ? (
                  <Circle
                    letter={el}
                    key={"tail"}
                    isSmall
                    state={ElementStates.Changing}
                  />
                ) : index === list.getSize() - 1 ? (
                  "tail"
                ) : (
                  ""
                )
              }
              state={
                isLoading && (index < addIndex || index <= deleteIndex)
                  ? ElementStates.Changing
                  : index === modifiedIndex
                  ? ElementStates.Modified
                  : ElementStates.Default
              }
            />
            {index !== list.getSize() - 1 && (
              <svg
                key={`svg_${index}`}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.29289 4.29289C9.68342 3.90237 10.3166 3.90237 10.7071 4.29289L18.4142 12L10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071C8.90237 19.3166 8.90237 18.6834 9.29289 18.2929L15.5858 12L9.29289 5.70711C8.90237 5.31658 8.90237 4.68342 9.29289 4.29289Z"
                  fill="#0032FF"
                ></path>
              </svg>
            )}{" "}
          </>
        ))}
      </div>
    </SolutionLayout>
  );
};
