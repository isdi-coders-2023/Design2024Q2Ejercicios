export function fizzBuzz(num: number): string {
  let result: string = "";

  if (num % 3 === 0 || num.toString().includes("3")) {
    result += "Fizz";
  }
  if (num % 5 === 0 || num.toString().includes("5")) {
    result += "Buzz";
  }

  if (result.length === 0) {
    return (result += num.toString());
  }

  return result;
}
