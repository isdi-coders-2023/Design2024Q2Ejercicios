import { caesarCypher } from "../src/caesarCypher";

describe("caesarCypher", () => {
  it("Debe devolver el mísmo caracter si no es una letra del alfabeto independientemente del offset", () => {
    expect(caesarCypher("!", 1)).toBe("!");
    expect(caesarCypher("!", 2)).toBe("!");
    expect(caesarCypher("2", 3)).toBe("2");
    expect(caesarCypher("z", 1)).toBe("a");
  });
  it("debería desplazar las letras del alfabeto por el número dado", () => {
    expect(caesarCypher("abcd", 1)).toBe("bdfh");
  });

  it("debería ignorar los espacios en blanco para aumentar el desplazamiento", () => {
    expect(caesarCypher("a b c d", 1)).toBe("b d f h");
  });

  it("debería funcionar con desplazamientos negativos", () => {
    expect(caesarCypher("abcd", -1)).toBe("zbdf");
  });

  it("debería funcionar con desplazamientos grandes", () => {
    expect(caesarCypher("abcd", 27)).toBe("bdfh");
  });

  it("debería funcionar con desplazamientos grandes y negativos", () => {
    expect(caesarCypher("abcd", -27)).toBe("zbdf");
  });

  it("debería funcionar con el ejemplo del README", () => {
    expect(
      caesarCypher(
        "I should have known that you would have a perfect answer for me!!!",
        1
      )
    ).toBe(
      "J ukszrk pjfp wacld kztn tkr unumf keak h xnbqqph pdjoxl ako kd!!!"
    );
  });
});
