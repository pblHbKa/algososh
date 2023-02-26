export function sleep(time:number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function randomArr(minLen: number, maxLen: number, min: number, max: number ): Array<number> {
    const arrLen =  Math.floor(minLen + Math.random() * (maxLen + 1 - minLen));
    let randomArr: Array<number> = [];
    for (let i = 0; i < arrLen; i++) {
      randomArr.push(Math.floor(min + Math.random() * (max + 1 - min)))
    }
    return randomArr;
  }