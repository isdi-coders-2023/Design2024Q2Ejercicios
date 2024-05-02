/* eslint-disable */

type fnType = any;
type argsType = any[];

// Higher order

// Imaginemos que tenemos un módulo que tiene algunas funciones de acceso a nuestra API, y nos
// gustaría que algunas tuviesen las siguientes características:
// - Asegurarnos que la misma función no se puede ejecutar dos veces simultáneamente
// - Monitorizar el tiempo de ejecución de la función
// - Logear todos los accesos que hacemos a la función

// Si no queremos que todas tengan estas características, ¿cómo podemos abordar la implementación
// para escoger en cuales lo ponemos?

const URL_TO_INVOKE = "http://www.xataka.com";

const invokeUrl = async (url: string) => {
  const response = await fetch(url);
  const result = await response.text();
  return result.substring(0, 100);
};

const waiter =
  (time: number) =>
  (fn: fnType) =>
  async (...args: any[]) => {
    await new Promise((resolve) => setTimeout(resolve, time));
    return await fn(...args);
  };

const monitor =
  (fn: fnType) =>
  async (...args: argsType) => {
    const start = Date.now();
    const result = await fn(...args);
    const end = Date.now();
    console.log(`Execution time: ${end - start}ms`);
    return result;
  };

const logger =
  (fn: fnType) =>
  async (...args: argsType) => {
    const name = fn.name || "anonymous";
    console.log(`Function ${name} called`);
    const result = await fn(...args);
    console.log(
      `Result from ${name} :\n\n---------\n ${result.substring(
        0,
        100
      )}\n--------------\n`
    );
    return result;
  };

const oncer =
  (fn: fnType) =>
  async (...args: argsType) => {
    if (fn.executing) {
      return;
    }

    fn.executing = true;
    const result = await fn(...args);
    fn.executing = false;
    return result;
  };

const createDecorator =
  (...fns: fnType[]) =>
  (targetFn: fnType) => {
    const composedFunc = fns.reduceRight((acc, fn) => fn(acc), targetFn);

    return (...args: argsType) => composedFunc(...args);
  };

const runDecorated = async () => {
  const decorator = createDecorator(oncer, waiter(3 * 1000), monitor, logger);

  const composedFunc = decorator(invokeUrl);

  composedFunc(URL_TO_INVOKE);
  composedFunc(URL_TO_INVOKE);
  composedFunc(URL_TO_INVOKE);
};

const runRaw = async () => {
  const composedFunc = invokeUrl;

  console.log(await composedFunc(URL_TO_INVOKE));
  console.log(await composedFunc(URL_TO_INVOKE));
  console.log(await composedFunc(URL_TO_INVOKE));
};

runDecorated();
// runRaw();
