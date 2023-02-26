import React from "react";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { useState } from "react";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { randomArr, sleep } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  enum sortTypeEn {
    bubble = "bubble",
    selection = "selection",
  }

  const [isLoadingAsc, setIsLoadingAsc] = useState<boolean>(false);
  const [isLoadingDes, setIsLoadingDes] = useState<boolean>(false);
  const [sortingArr, setSortingArr] = useState<Array<[number, ElementStates]>>(
    []
  );
  const [sortType, setSortType] = useState<sortTypeEn>(sortTypeEn.selection);

  const sortArr = async (direction: Direction) => {
    if (sortType === sortTypeEn.bubble) {
      sortArrBubble(direction);
    } else {
      sortArrSelection(direction);
    }
  };

  const sortArrSelection = async (direction: Direction) => {
    for (let i = 0; i < sortingArr.length; i++) {
      let limIndex = i;
      sortingArr[i][1] = ElementStates.Changing;
      setSortingArr([...sortingArr]);
      await sleep(SHORT_DELAY_IN_MS);
      for (let j = i; j < sortingArr.length; j++) {
        if (
          (direction === Direction.Ascending &&
            sortingArr[j][0] < sortingArr[limIndex][0]) ||
          (direction === Direction.Descending &&
            sortingArr[j][0] > sortingArr[limIndex][0])
        ) {
          sortingArr[limIndex][1] = ElementStates.Default;
          limIndex = j;
          sortingArr[j][1] = ElementStates.Changing;
          setSortingArr([...sortingArr]);
          await sleep(SHORT_DELAY_IN_MS);
        }
      }
      if (limIndex !== i) {
        [sortingArr[i], sortingArr[limIndex]] = [
          sortingArr[limIndex],
          sortingArr[i],
        ];
      }
      sortingArr[i][1] = ElementStates.Modified;
      setSortingArr([...sortingArr]);
      await sleep(SHORT_DELAY_IN_MS);
    }
  };

  const sortArrBubble = async (direction: Direction) => {
    for (let i = 0; i < sortingArr.length; i++) {
      for (let j = 0; j + 1 < sortingArr.length - i; j++) {
        sortingArr[j][1] = ElementStates.Changing;
        sortingArr[j + 1][1] = ElementStates.Changing;
        setSortingArr([...sortingArr]);
        await sleep(SHORT_DELAY_IN_MS);
        if (
          (direction === Direction.Ascending &&
            sortingArr[j + 1] < sortingArr[j]) ||
          (direction === Direction.Descending &&
            sortingArr[j + 1] > sortingArr[j])
        ) {
          [sortingArr[j], sortingArr[j + 1]] = [
            sortingArr[j + 1],
            sortingArr[j],
          ];
          setSortingArr([...sortingArr]);
          await sleep(SHORT_DELAY_IN_MS);
        }
        sortingArr[j][1] = ElementStates.Default;
        sortingArr[j + 1][1] = ElementStates.Default;
        setSortingArr([...sortingArr]);
      }
      sortingArr[sortingArr.length - 1 - i][1] = ElementStates.Modified;
      setSortingArr([...sortingArr]);
    }
  };

  const handlerClickSortAsc = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoadingAsc(true);
    sortArr(Direction.Ascending);
    setIsLoadingAsc(false);
  };
  const handlerClickSortDes = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoadingDes(true);
    sortArr(Direction.Descending);
    setIsLoadingDes(false);
  };
  const handlerClickNewArr = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSortingArr(
      randomArr(3, 17, 0, 100).map((el) => [el, ElementStates.Default])
    );
  };
  const handlerClickSortType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortType(
      e.target.value == sortTypeEn.bubble
        ? sortTypeEn.bubble
        : sortTypeEn.selection
    );
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.contentBox}>
        <RadioInput
          label="Выбор"
          name="sortType"
          value={sortTypeEn.selection}
          onChange={handlerClickSortType}
          extraClass={styles.radioInput}
          checked={sortType === sortTypeEn.selection}
        />
        <RadioInput
          label="Пузырёк"
          name="sortType"
          value={sortTypeEn.bubble}
          onChange={handlerClickSortType}
          extraClass={styles.radioInput}
          checked={sortType === sortTypeEn.bubble}
        />
        <Button
          onClick={handlerClickSortAsc}
          text="По возрастанию"
          isLoader={isLoadingAsc}
          extraClass={styles.button}
          sorting={Direction.Ascending}
        />
        <Button
          onClick={handlerClickSortDes}
          text="По убыванию"
          isLoader={isLoadingDes}
          extraClass={styles.button}
          sorting={Direction.Descending}
        />
        <Button
          onClick={handlerClickNewArr}
          text="Новый массив"
          extraClass={styles.newArr}
        />
      </div>

      {sortingArr.length > 0 && (
        <div className={styles.diagram}>
          {sortingArr.map((el, index) => (
            <Column index={el[0]} state={el[1]} key={index} />
          ))}
        </div>
      )}
    </SolutionLayout>
  );
};
