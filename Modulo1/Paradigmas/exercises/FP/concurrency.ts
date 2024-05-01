// Concurrencia

// El siguiente ejemplo muestra los problemas que se pueden derivar del uso de funciones
// imputas en un entorno concurrente. En este caso, la función
// workerNonFunctional no es pura, ya que modifica una variable externa. Si se ejecutan
// varias instancias de esta función de forma concurrente, se pueden producir resultados
// inesperados.

interface Load {
  counter: number;
}

const load: Load = {
  counter: 0,
};

const wait = async () =>
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000));

const workerNonFunctional = async (givenLoad: Load) => {
  await wait();

  const loadValue = givenLoad.counter;
  await wait();

  const newValue = loadValue + 1;

  console.log(
    `Counter read: ${loadValue} - Counter before: ${givenLoad.counter} - Counter after: ${newValue}`
  );
  givenLoad.counter = newValue;
};

const runConcurrencyProblems = async () => {
  const workers = Array.from({ length: 10 }, () => workerNonFunctional(load));

  await Promise.all(workers);

  console.log(`Counter instance: ${load.counter}`);
};

runConcurrencyProblems();
