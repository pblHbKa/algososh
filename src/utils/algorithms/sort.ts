import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";

export const sortArrSelection = (sortingArr: Array<[number, ElementStates]>, direction: Direction) => {
    for (let i = 0; i < sortingArr.length; i++) {
      let limIndex = i;
      sortingArr[i][1] = ElementStates.Changing;
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
        }
      }
      if (limIndex !== i) {
        [sortingArr[i], sortingArr[limIndex]] = [
          sortingArr[limIndex],
          sortingArr[i],
        ];
      }
      sortingArr[i][1] = ElementStates.Modified;
    }
    return sortingArr;
  };

export const sortArrBubble = (sortingArr: Array<[number, ElementStates]>, direction: Direction) => {
    for (let i = 0; i < sortingArr.length; i++) {
      for (let j = 0; j + 1 < sortingArr.length - i; j++) {
        sortingArr[j][1] = ElementStates.Changing;
        sortingArr[j + 1][1] = ElementStates.Changing;
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
        }
        sortingArr[j][1] = ElementStates.Default;
        sortingArr[j + 1][1] = ElementStates.Default;
      }
      sortingArr[sortingArr.length - 1 - i][1] = ElementStates.Modified;
    }
    return sortingArr;
  };