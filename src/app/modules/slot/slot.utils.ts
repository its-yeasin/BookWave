export const timeToMinutes = (time: string) => {
  const splittedTime = time.split(":");
  const hours = parseInt(splittedTime[0]);
  const minutes = parseInt(splittedTime[1]);

  // Convert hours to minutes and add the minutes
  return hours * 60 + minutes;
};

export const convertTimeToTimestamp = (time: string) => {
  const timestamp = new Date(`1970-01-01T${time}:00`);

  // returns timestamp in seconds
  return timestamp;
};
