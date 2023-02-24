import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/utils";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [reverseArr, setReverseArr] = useState<Array<[string, ElementStates]>>(
    []
  );

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const reverse = async () => {
    setIsLoading(true);
    let textArr: Array<[string, ElementStates]> = inputText
      .split("")
      .map((el) => [el, ElementStates.Default]);
    setReverseArr(textArr);
    let letter = "";
    for (let i = 0, j = textArr.length - 1; i <= j; i++, j--) {
      textArr[i][1] = ElementStates.Changing;
      textArr[j][1] = ElementStates.Changing;
      setReverseArr([...textArr]);
      await sleep(DELAY_IN_MS);
      letter = textArr[i][0];
      textArr[i] = [textArr[j][0], ElementStates.Modified];
      textArr[j] = [letter, ElementStates.Modified];
      setReverseArr([...textArr]);
      await sleep(DELAY_IN_MS);
    }
    setIsLoading(false);
  };

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reverse();
    setInputText("");
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.contentBox}>
        <Input
          extraClass="mr-6"
          placeholder="Введите текст"
          maxLength={11}
          isLimitText={true}
          value={inputText}
          onChange={handlerChange}
        ></Input>
        <Button onClick={handlerClick} text="Развернуть" isLoader={isLoading} />
      </div>
      {reverseArr.length > 0 && (
        <div className={styles.circleBox}>
          {reverseArr.map((el, index) => (
            <Circle letter={el[0]} state={el[1]} extraClass="mr-8" key={index}/>
          ))}
        </div>
      )}
    </SolutionLayout>
  );
};
