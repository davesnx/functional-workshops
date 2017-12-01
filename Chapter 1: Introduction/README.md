# Chapter 1: Introduction to Functional Programming

The first step would be to do a TDD Kata but before you begin making the tests green you need to write in human language (or [pseudocode](https://en.wikipedia.org/wiki/Pseudocode)) the implementation.

Let me do simple example:

Given this test
```js
  describe('Should sum strings and return as a Number', () => {
    expect(sum("4", "5")).toBe(9)
  })
```
You should write the pseudocode for the `sum` method...
```js
  const sum = () => {
    // Receives 2 parameters as strings,
    // interpretates those strings as integers
    // and return the sum of them
  }
```
and after that, write the implementation...

```js
  const sum = (a, b) => {
    let left = parseInt(a, 10)
    let right = parseInt(b, 10)
    return left + right
  }
```

After you made all the implementation you try to reason about what functional can give...
and try to refactor in order to play around with some concepts:
- Declarative
- Pure functions
- Combine
- Curry
- Immutable

> We will use Ramda as a library in order to provide most of the methods.

Following the example:
```js
  const sum = (...args) => R.sum(args)
```

#### The step-by-stel list is:
- Install: `npm install`
- Write in **human language** a *"how-to-solve"* each problem
- Run tests: `npm test`
- Implement your solution as it would be a regular TDD kata
- Read `examples/` and try to apply to your code.
- Refactor using: Pure functions, Curry, Compose/Pipe, and other Ramda helpers.
- Once you feel that you refactor enough, you could check if the human language that you write before is more similar to after the refactor or before.
- When you finish, you could check the `solution/` folder and compare with my solution.
- If you have any suggestion, you could open a PR and change my solution or add any test case.

#### Next steps:
  I want to create a second level of this kata, adding Functional Data Structures like Monads and make a UI based on this Model.
  Will consist on make the pokemons fight agains each other and try to draw who lives or who dies (similar to game of life).

References:
- [Mostly adequate guide](http://drboolean.gitbooks.io/mostly-adequate-guide/) by drboolean.
- A very good explanation of Ramda in a [Blogpost](http://randycoulman.com/blog/categories/thinking-in-ramda/)


Credits about the "pokemon" idea: [marcoemrich/pointfree_pokemon_kata](https://github.com/marcoemrich/pointfree_pokemon_kata)