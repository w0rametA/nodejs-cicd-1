// max(number[]): number
// min(number[]): number
// avg(number[]): number

export function max(numbers: number[]): number {
  if (!numbers.length) throw Error("numbers was empty");
  let currMax = numbers[0];
  numbers.forEach((n) => {
    if (n > currMax) {
      currMax = n;
    }
  });

  return currMax;
}

export function min(numbers: number[]): number {
  if (!numbers.length) throw Error("numbers was empty");
  let currMin = numbers[0];
  numbers.forEach((n) => {
    if (n < currMin) {
      currMin = n;
    }
  });

  return currMin;
}

export function avg(numbers: number[]): number {
  if (!numbers.length) throw Error("numbers was empty");
  const sum = numbers.reduce((r, n) => {
    return r + n;
  });

  return sum / numbers.length;
}
