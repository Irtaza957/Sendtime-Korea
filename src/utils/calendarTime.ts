export const timeUnitToMilliseconds = (timeUnit: string) => {
  if (timeUnit.includes('시간') && timeUnit.includes('분')) {
    const [hr, min] = timeUnit.split('시간');
    const time = parseInt(hr) * (60000 * 60);
    const minute = parseInt(min) * 60000;

    return time + minute;
  }

  if (timeUnit.includes('시간')) {
    const [hr] = timeUnit.split('시간');

    return parseInt(hr) * (60000 * 60);
  }

  if (timeUnit.includes('분')) {
    const [min] = timeUnit.split('분');

    return parseInt(min) * 60000;
  }

  return 0;
};
