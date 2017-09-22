// Pipe and Compose

const multiply = (a, b) => a * b
const addOne = x => x + 1
const square = x => x * x

const operate = (x, y) => {
  const product = multiply(x, y)
  const incremented = addOne(product)
  const squared = square(incremented)

  return squared
}

operate(3, 4)
// ((3 * 4) + 1)^2
// (12 + 1)^2
// 13^2
// 169

const operate2 = (x, y) => {
  return square(addOne(multiply(x, y)))
}

const operate3 = pipe(multiply, addOne, square)
const operate4 = compose(square, addOne, multiply)
