import { useMemo, useState, type ChangeEvent } from "react";
import { WORDLIST } from "../wordlist";
import { getRandomWordlist } from "../utils/get-random-wordlist";
import {
  getTimeDifferenceInMilliseconds,
  getTimeDifferenceInSeconds,
} from "@/utils/time-differences";

type Character = {
  text: string;
  state: "correct" | "incorrect" | "untyped";
};

type Timestamp = {
  start?: Date;
  end?: Date;
};

const WORDLIST_LENGTH = 5;

export default function TypingTest() {
  const wordlist = useMemo(() => {
    return getRandomWordlist(WORDLIST, WORDLIST_LENGTH);
  }, []);

  const [characters, setCharacters] = useState<Character[]>(() => {
    return wordlist
      .join(" ")
      .split("")
      .map((char) => ({ text: char, state: "untyped" }));
  });

  const [input, setInput] = useState<string>("");
  const [timestamp, setTimestamp] = useState<Timestamp>({});
  const [isTestActive, setIsTestActive] = useState<boolean>(false);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value;
    const inputCharacters = input.split("");
    const charactersCopy = characters.slice();

    if (inputCharacters.length === 1) {
      setTimestamp({ start: new Date(), end: undefined });
      setIsTestActive(true);
    }

    if (
      inputCharacters.length === charactersCopy.length + 1 &&
      inputCharacters[inputCharacters.length - 1] === " " &&
      isTestActive
    ) {
      setTimestamp((prev) => ({ ...prev, end: new Date() }));
      setIsTestActive(false);
      return;
    }

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

  const getLabel = () => {
    if (isTestActive || !timestamp || !timestamp.start || !timestamp.end) {
      return;
    }

    const milliseconds = getTimeDifferenceInMilliseconds(timestamp.start, timestamp.end);
    const seconds = getTimeDifferenceInSeconds(timestamp.start, timestamp.end);

    const restMilliseconds = Math.floor(milliseconds - seconds * 1000);

    return (
      <p>
        <span>
          Accomplished in {seconds}.{restMilliseconds} seconds
        </span>
      </p>
    );
  };

  return (
    <article className="space-y-6">
      <section className="p-4 border rounded-md bg-muted/20">
        <h2 className="text-lg font-semibold mb-2">Type the following sequence:</h2>
        <div
          className="flex flex-wrap text-lg font-mono leading-relaxed break-words"
          aria-label="Typing area"
        >
          {characters.map((char, index) => (
            <span
              key={index}
              className={
                char.state === "correct"
                  ? "text-green-600"
                  : char.state === "incorrect"
                  ? "text-red-600"
                  : "text-gray-700"
              }
            >
              {char.text === " " ? "␣" : char.text}
            </span>
          ))}
        </div>
      </section>

      {getLabel()}

      <section>
        <form className="space-y-2">
          <label htmlFor="typing-input" className="block text-sm font-medium">
            Your input
          </label>
          <textarea
            id="typing-input"
            value={input}
            onChange={onChange}
            className="w-full p-2 border rounded-md resize-none font-mono bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            rows={5}
            placeholder="Start typing here..."
          />
        </form>
      </section>
    </article>
  );
}
