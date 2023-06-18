export const sortDurations = (timeUnit: string[]) => {
  const duplicateArray = [...timeUnit];
  const NumberArray: number[] = [];
  let stringArrayTemp;
  let numberArrayTemp;
  duplicateArray.forEach((element) => {
    if (element.includes('시간') && element.includes('분')) {
      const [hr, min] = element.split('시간');
      const time = parseInt(hr) * 60;
      const minute = parseInt(min);
      NumberArray.push(time + minute);
    } else if (element.includes('시간')) {
      const [hr] = element.split('시간');
      const time = parseInt(hr) * 60;
      NumberArray.push(time);
    } else if (element.includes('분')) {
      const [min] = element.split('분');
      const time = parseInt(min);
      NumberArray.push(time);
    }
  });
  for (let i = 0; i < NumberArray.length - 1; i++) {
    for (let j = 0; j < NumberArray.length - i - 1; j++) {
      if (NumberArray[j] > NumberArray[j + 1]) {
        stringArrayTemp = duplicateArray[j];
        duplicateArray[j] = duplicateArray[j + 1];
        duplicateArray[j + 1] = stringArrayTemp;
        numberArrayTemp = NumberArray[j];
        NumberArray[j] = NumberArray[j + 1];
        NumberArray[j + 1] = numberArrayTemp;
      }
    }
  }
  return duplicateArray;
};
