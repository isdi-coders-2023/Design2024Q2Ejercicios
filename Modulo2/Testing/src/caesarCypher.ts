const ALPHABET = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
const ALPHABET_LENGTH = ALPHABET.length;

const isInAlphabet = (char: string) => {
  return ALPHABET.includes(char.toLowerCase());
};

const isUpperCase = (char: string) => {
  return char === char.toUpperCase();
};

export function caesarCypher(text: string, offset: number): string {
  let decypheredString = "";
  const isPositive = offset > 0;

  if (text.length === 0) {
    throw new Error("EmptyString");
  }

  for (const char of text) {
    if (!isInAlphabet(char)) {
      decypheredString += char;
      continue;
    }

    const currentIndex = ALPHABET.indexOf(char.toLowerCase());

    let nextIndex = (currentIndex + offset) % ALPHABET_LENGTH;
    if (nextIndex < 0) {
      nextIndex += ALPHABET_LENGTH;
    }

    const nextChar = ALPHABET[nextIndex];
    decypheredString += !isUpperCase(char) ? nextChar : nextChar.toUpperCase();

    offset++;
  }
  return decypheredString;
}
