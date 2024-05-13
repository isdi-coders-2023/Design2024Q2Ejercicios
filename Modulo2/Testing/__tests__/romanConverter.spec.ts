import { arabicToRoman } from "../src/romanConverter";

describe("Prueba básica:", () => {
  it('Convierte 1 a "I"', () => {
    expect(arabicToRoman(1)).toBe("I");
  });
  it('Convierte 5 a "V"', () => {
    expect(arabicToRoman(5)).toBe("V");
  });
  it('Convierte 10 a "X"', () => {
    expect(arabicToRoman(10)).toBe("X");
  });
  it('Convierte 50 a "L"', () => {
    expect(arabicToRoman(50)).toBe("L");
  });
  it('Convierte 100 a "C"', () => {
    expect(arabicToRoman(100)).toBe("C");
  });
});

describe("Prueba de números múltiples:", () => {
  it('Convierte 2 a "II"', () => {
    expect(arabicToRoman(2)).toBe("II");
  });

  it('Convierte 3 a "III"', () => {
    expect(arabicToRoman(3)).toBe("III");
  });
  it('Convierte 8 a "VIII"', () => {
    expect(arabicToRoman(8)).toBe("VIII");
  });
  it('Convierte 20 a "XX"', () => {
    expect(arabicToRoman(20)).toBe("XX");
  });
  it('Convierte 200 a "CC"', () => {
    expect(arabicToRoman(200)).toBe("CC");
  });
});

describe("Prueba de números especiales:", () => {
  it('Convierte 4 a "IV"', () => {
    expect(arabicToRoman(4)).toBe("IV");
  });
  it('Convierte 9 a "IX"', () => {
    expect(arabicToRoman(9)).toBe("IX");
  });
  it('Convierte 40 a "XL"', () => {
    expect(arabicToRoman(40)).toBe("XL");
  });
  it('Convierte 90 a "XC"', () => {
    expect(arabicToRoman(90)).toBe("XC");
  });
});

describe("Prueba de números compuestos:", () => {
  it('Convierte 93 a "XCIII"', () => {
    expect(arabicToRoman(93)).toBe("XCIII");
  });
  it('Convierte 57 a "LVII"', () => {
    expect(arabicToRoman(57)).toBe("LVII");
  });
  it('Convierte 14 a "XIV"', () => {
    expect(arabicToRoman(14)).toBe("XIV");
  });
  it('Convierte 2984 a "MMCMLXXXIV"', () => {
    expect(arabicToRoman(2984)).toBe("MMCMLXXXIV");
  });
});

describe("Prueba de números grandes:", () => {
  it('Convierte 500 a "D"', () => {
    expect(arabicToRoman(500)).toBe("D");
  });
  it('Convierte 1000 a "M"', () => {
    expect(arabicToRoman(1000)).toBe("M");
  });
  it('Convierte 3999 a "MMMCMXCIX"', () => {
    expect(arabicToRoman(3999)).toBe("MMMCMXCIX");
  });
});

describe("Prueba de límites:", () => {
  it("Con 0 debe lanzar una excepción", () => {
    expect(() => arabicToRoman(0)).toThrow("Invalid range");
  });
  it("Con mayores de 3999 debe lanzar una excepción", () => {
    expect(() => arabicToRoman(4000)).toThrow("Invalid range");
  });
  it("Con menores de 0 debe lanzar una excepción", () => {
    expect(() => arabicToRoman(-1)).toThrow("Invalid range");
  });
});
