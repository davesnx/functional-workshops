// Curry

const publishedInYear = (book, year) => book.year === year

const titlesForYear = (books, year) => {
  const selected = filter(book => publishedInYear(book, year), books)

  return map(book => book.title, selected)
}

function publishedInYear (year) {
  return function (book) {
    return book.year === year
  }
}

// Partial Application, vs underscore

const _ = require('underscore')
const R = require('ramda')

const pokemons = [1, 2, 3]

_.map(pokemons, console.log)
R.map(console.log, pokemons)
