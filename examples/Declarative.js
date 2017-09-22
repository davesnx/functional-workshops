// Declarative languages

/*

<article>
  <header>
    <h1>Declarative Programming</h1>
    <p>Sprinkle Declarative in your verbiage to sound smart</p>
  </header>
</article>

SELECT * FROM Users WHERE Country=’Mexico’;

This two examples are declarative languages

*/

const numbers = [1, 2, 3]

function double (arr) {
  let results = []
  for (let i = 0; i < arr.length; i++) {
    results.push(arr[i] * 2)
  }
  return results
}

double(numbers) // => [2, 4, 6]

function double2 (x) {
  return x * 2
}

numbers.map(double2) // => [2, 4, 6]
