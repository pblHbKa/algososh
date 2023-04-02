import renderer from "react-test-renderer";
import { ElementStates } from "../../../types/element-states";

import { Circle } from "./circle";

it("Кружок без буквы отрисовывается правильно", () => {
  const circle = renderer.create(<Circle />).toJSON();
  expect(circle).toMatchSnapshot();
});

it("Кружок с буквами отрисовывается правильно", () => {
  const circle = renderer.create(<Circle letter="test" />).toJSON();
  expect(circle).toMatchSnapshot();
});

it("Кружок с head отрисовывается правильно", () => {
  const circle = renderer.create(<Circle head={"test"} />).toJSON();
  expect(circle).toMatchSnapshot();
});

it("Кружок с react-элементом в head отрисовывается правильно", () => {
  const circle = renderer.create(<Circle head={<div>test</div>} />).toJSON();
  expect(circle).toMatchSnapshot();
});

it("Кружок с tail отрисовывается правильно", () => {
  const circle = renderer.create(<Circle tail={"test"} />).toJSON();
  expect(circle).toMatchSnapshot();
});

it("Кружок с react-элементом в tail отрисовывается правильно", () => {
  const circle = renderer.create(<Circle tail={<div>test</div>} />).toJSON();
  expect(circle).toMatchSnapshot();
});

it("Маленький кружок отрисовывается правильно", () => {
  const circle = renderer.create(<Circle isSmall={true} />).toJSON();
  expect(circle).toMatchSnapshot();
});

it("Кружок в обычном состоянии отрисовывается правильно", () => {
  const circle = renderer
    .create(<Circle state={ElementStates.Default} />)
    .toJSON();
  expect(circle).toMatchSnapshot();
});

it("Кружок в состоянии изменения отрисовывается правильно", () => {
  const circle = renderer
    .create(<Circle state={ElementStates.Changing} />)
    .toJSON();
  expect(circle).toMatchSnapshot();
});

it("Обработанный кружок отрисовывается правильно", () => {
  const circle = renderer
    .create(<Circle state={ElementStates.Modified} />)
    .toJSON();
  expect(circle).toMatchSnapshot();
});
