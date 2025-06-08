import { getRandomNumber } from "./get-random-number";

export const getRandomWordlist = (wordlist: string[], length: number) => {
  return Array.from({ length }, () => {
    const index = getRandomNumber(wordlist.length);
    return wordlist[index];
  });
};
