export const reverseString = (text: String) => {
    let textArr: Array<string> = text
      .split("");
    let letter = "";
    for (let i = 0, j = textArr.length - 1; i <= j; i++, j--) {
      letter = textArr[i][0];
      textArr[i] = textArr[j][0];
      textArr[j] = letter;
    }
    return textArr.join('');
  };