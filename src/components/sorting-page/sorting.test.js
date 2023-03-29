import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { sortArrBubble, sortArrSelection } from "../../utils/algorithms/sort";

it("Корректная сортировка выбором пустого массива", () => {
  expect(sortArrSelection([], Direction.Ascending)).toEqual([]);
});

it("Корректная сортировка выбором массива из одного элемента", () => {
  expect(sortArrSelection([[0, ElementStates.Default]], Direction.Ascending)).toEqual([
    [0, ElementStates.Modified],
  ]);
});

it("Корректная сортировка выбором из нескольких элементов", () => {
  expect(
    sortArrSelection([
      [2, ElementStates.Default],
      [-1, ElementStates.Default],
      [400, ElementStates.Default],
      [0.5, ElementStates.Default],
    ], Direction.Ascending)
  ).toEqual([
    [-1, ElementStates.Modified],
    [0.5, ElementStates.Modified],
    [2, ElementStates.Modified],
    [400, ElementStates.Modified],
  ]);
});

it("Корректная сортировка выбором по убыванию", () => {
    expect(
        sortArrSelection([
        [2, ElementStates.Default],
        [-1, ElementStates.Default],
        [400, ElementStates.Default],
        [0.5, ElementStates.Default],
      ], Direction.Descending)
    ).toEqual([
      [400, ElementStates.Modified],
      [2, ElementStates.Modified],
      [0.5, ElementStates.Modified],
      [-1, ElementStates.Modified],
    ]);
  });

it("Корректная сортировка пузырьком пустого массива", () => {
    expect(sortArrBubble([], Direction.Ascending)).toEqual([]);
  });
  
  it("Корректная сортировка пузырьком массива из одного элемента", () => {
    expect(sortArrBubble([[0, ElementStates.Default]], Direction.Ascending)).toEqual([
      [0, ElementStates.Modified],
    ]);
  });
  
  it("Корректная сортировка пузырьком из нескольких элементов", () => {
    expect(
        sortArrBubble([
        [2, ElementStates.Default],
        [-1, ElementStates.Default],
        [400, ElementStates.Default],
        [0.5, ElementStates.Default],
      ], Direction.Ascending)
    ).toEqual([
      [-1, ElementStates.Modified],
      [0.5, ElementStates.Modified],
      [2, ElementStates.Modified],
      [400, ElementStates.Modified],
    ]);
  });

  it("Корректная сортировка пузырьком по убыванию", () => {
    expect(
        sortArrBubble([
        [2, ElementStates.Default],
        [-1, ElementStates.Default],
        [400, ElementStates.Default],
        [0.5, ElementStates.Default],
      ], Direction.Descending)
    ).toEqual([
      [400, ElementStates.Modified],
      [2, ElementStates.Modified],
      [0.5, ElementStates.Modified],
      [-1, ElementStates.Modified],
    ]);
  });
  