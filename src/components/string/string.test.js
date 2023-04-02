import { reverseString } from "../../utils/algorithms/string";

it("Корректный разворот строки с четным количеством символов", () => {
  expect(reverseString("главрыба")).toEqual("абырвалг");
});

it("Корректный разворот строки с нечетным количеством символов", () => {
  expect(reverseString("хорош город")).toEqual("дорог шорох");
});

it("Корректный разворот строки с одним символов", () => {
  expect(reverseString("я")).toEqual("я");
});

it("Корректный разворот пустой строки", () => {
  expect(reverseString("")).toEqual("");
});
