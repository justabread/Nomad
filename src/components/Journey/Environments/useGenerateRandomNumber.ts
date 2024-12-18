/**
 * useGenerateRandomNumber
 * The function returns a random number between the given min and max
 * @param min - the minimum number
 * @param max - the maximum number
 * @returns a random number between the given min and max
 */
const useGenerateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default useGenerateRandomNumber;
