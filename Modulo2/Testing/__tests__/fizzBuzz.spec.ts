import { fizzBuzz } from "../src/fizzBuzz";

describe("FizzBuzz", () => {
  it('debería devolver "Fizz" para múltiplos de 3', () => {
    expect(fizzBuzz(3)).toEqual("Fizz");
    expect(fizzBuzz(6)).toEqual("Fizz");
  });

  it('debería devolver "Buzz" para múltiplos de 5', () => {
    expect(fizzBuzz(5)).toEqual("Buzz");
    expect(fizzBuzz(50)).toEqual("Buzz");
  });

  it('debería devolver "FizzBuzz" para múltiplos de 3 y 5', () => {
    expect(fizzBuzz(15)).toEqual("FizzBuzz");
    expect(fizzBuzz(30)).toEqual("FizzBuzz");
  });

  it("debería devolver el número mismo para otros casos", () => {
    expect(fizzBuzz(1)).toEqual("1");
    expect(fizzBuzz(2)).toEqual("2");
    expect(fizzBuzz(7)).toEqual("7");
    expect(fizzBuzz(74)).toEqual("74");
  });

  it('debería devolver "Fizz" para numeros que contienen el 3 pero no son múltiplos', () => {
    expect(fizzBuzz(73)).toEqual("Fizz");
  });
  it('debería devolver "Buzz" para numeros que contienen el 5 pero no son múltiplos', () => {
    expect(fizzBuzz(52)).toEqual("Buzz");
  });
  it('debería devolver "FizBuzz" para numeros que contienen el 5 y no son múltiplos 3', () => {
    expect(fizzBuzz(51)).toEqual("FizzBuzz");
  });

  it('debería devolver "FizBuzz" para numeros que contienen el 3 y no son múltiplos 5', () => {
    expect(fizzBuzz(130)).toEqual("FizzBuzz");
  });
});
