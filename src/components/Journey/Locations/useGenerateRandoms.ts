// /**
//  * useGenerateRandomElement
//  * The function returns a random element from the given Record
//  * @param Elements - must be a Record
//  * @returns a random element from the Record
//  */
// const useGenerateRandomElement = <T, K extends string | number | symbol>(
//   Elements: Record<K, T>
// ): [K, T] => {
//   const keys = Object.keys(Elements) as K[];
//   const randomElementIndex = Math.floor(Math.random() * keys.length);
//   const selectedKey = keys[randomElementIndex];

//   return [selectedKey, Elements[selectedKey]];
// };

// export default useGenerateRandomElement;

// export const useGenerateRandomLocation = (
//   locations: Record<LocationNamesEnum, LocationElementInterface>
// ) => {};

// export const useGenerateRandomEvent = (
//   events: Record<, (props: any) => JSX.Element>
// ) => {};

export const generateRandomElement = <T>(
  elements: T[],
  previousElement?: T
) => {
  if (previousElement) {
    const elementsWithoutPreviousElement = elements.filter((element) => {
      return element !== previousElement;
    });

    return elementsWithoutPreviousElement[
      generateRandomNumber(elementsWithoutPreviousElement.length - 1)
    ];
  } else {
    return elements[generateRandomNumber(elements.length - 1)];
  }
};

export const generateRandomNumber = (max: number, min: number = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
