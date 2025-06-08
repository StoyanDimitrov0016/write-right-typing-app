import { useMemo, useState, type ChangeEvent } from "react";
import { WORDLIST } from "../wordlist";
import { getRandomWordlist } from "../utils/get-random-wordlist";

type Character = {
  text: string;
  state: "correct" | "incorrect" | "untyped";
};

export default function TypingTest() {
  const wordlist = useMemo(() => {
    return getRandomWordlist(WORDLIST, WORDLIST.length);
  }, []);

  const [characters, setCharacters] = useState<Character[]>(() => {
    return wordlist
      .join(" ")
      .split("")
      .map((char) => ({ text: char, state: "untyped" }));
  });

  const [input, setInput] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    const inputCharacters = input.split("");

    const charactersCopy = characters.slice();

    for (let i = 0; i < inputCharacters.length; i++) {
      const typedCharacter = inputCharacters[i];
      const desiredCharacter = charactersCopy[i];

      if (typedCharacter === desiredCharacter.text) {
        charactersCopy[i].state = "correct";
      } else {
        charactersCopy[i].state = "incorrect";
      }
    }

    for (let i = inputCharacters.length; i < charactersCopy.length; i++) {
      charactersCopy[i].state = "untyped";
    }

    setInput(input);
    setCharacters(charactersCopy);
  };

  return (
    <section>
      <section>
        {characters.map((char, index) => {
          return (
            <span
              className={
                char.state === "correct"
                  ? "text-green-500"
                  : char.state === "incorrect"
                  ? "text-red-500"
                  : ""
              }
              key={index}
            >
              {char.text}
            </span>
          );
        })}
      </section>
      <section>
        <form>
          <textarea value={input} onChange={onChange} />
        </form>
      </section>
    </section>
  );
}
