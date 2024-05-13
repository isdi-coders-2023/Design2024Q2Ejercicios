export function arabicToRoman(num: number): string {
  if (num < 1 || num > 3999) {
    throw new Error("Invalid range");
  }

  const codigosRomanos: { letter: string; value: number }[] = [
    { letter: "M", value: 1000 },
    { letter: "CM", value: 900 },
    { letter: "D", value: 500 },
    { letter: "CD", value: 400 },
    { letter: "C", value: 100 },
    { letter: "XC", value: 90 },
    { letter: "L", value: 50 },
    { letter: "XL", value: 40 },
    { letter: "X", value: 10 },
    { letter: "IX", value: 9 },
    { letter: "V", value: 5 },
    { letter: "IV", value: 4 },
    { letter: "I", value: 1 },
  ];

  let result = "";

  codigosRomanos.forEach((codigo) => {
    while (num >= codigo.value) {
      result += codigo.letter;
      num -= codigo.value;
    }
  });

  return result;
}
