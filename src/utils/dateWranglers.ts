export const ensureMsTimestamp = (
  unsafeTimestamp: string | number | Date
): number => {
  let properTimestamp: number;
  if (typeof unsafeTimestamp === 'string') {
    properTimestamp = parseInt(unsafeTimestamp, 10);
  } else if (unsafeTimestamp instanceof Date) {
    properTimestamp = unsafeTimestamp.getTime();
  } else {
    properTimestamp = unsafeTimestamp;
  }
  if (properTimestamp < 99999999999) {
    // We can safely assume that a 11 digit number represents a timestamp in seconds
    properTimestamp *= 1000;
  }

  return properTimestamp;
};

export const unixTimestampToYyyyMmDdDateString = (
  timestampString: string
): string => {
  const timestamp = ensureMsTimestamp(timestampString);
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
