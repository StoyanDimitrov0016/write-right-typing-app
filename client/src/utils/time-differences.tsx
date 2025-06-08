export const getTimeDifferenceInSeconds = (startDate: Date, endDate: Date) => {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  return Math.floor((endTime - startTime) / 1000);
};

export const getTimeDifferenceInMilliseconds = (startDate: Date, endDate: Date) => {
  return endDate.getTime() - startDate.getTime();
};
