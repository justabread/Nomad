const useGenerateRandomElement = <T, K extends string | number | symbol>(
  Elements: Record<K, T>
): [K, T] => {
  const keys = Object.keys(Elements) as K[];
  const randomElementIndex = Math.floor(Math.random() * keys.length);
  const selectedKey = keys[randomElementIndex];

  return [selectedKey, Elements[selectedKey]];
};

export default useGenerateRandomElement;