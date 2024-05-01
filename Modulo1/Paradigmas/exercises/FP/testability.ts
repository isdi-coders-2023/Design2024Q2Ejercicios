// Testabilidad

// Las funciones puras son más fáciles de testear que las funciones impuras.
// En concreto, las funciones puras no tienen efectos secundarios, por lo que
// su salida siempre es la misma para una entrada dada. Por tanto, se pueden
// realizar tests unitarios de forma más sencilla, ya que no es necesario
// tener en cuenta el estado del sistema.

const getFirstElement = (a: number[]) => {
  return a.splice(0, 1);
};

const testArray = [1, 2, 3, 4, 5];

console.log(
  `First element should be 1 : ${getFirstElement(testArray)[0] === 1}`
);
console.log(
  `First element should be 1 : ${getFirstElement(testArray)[0] === 1}`
);
console.log(
  `First element should be 1 : ${getFirstElement(testArray)[0] === 1}`
);
console.log(
  `First element should be 1 : ${getFirstElement(testArray)[0] === 1}`
);
