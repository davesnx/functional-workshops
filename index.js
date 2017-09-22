const R = require('ramda')

/*

type alias Pokemon = {
  id: Number,
  name: String,
  type: PokemonTypes,
  position: [Number, Number]
}

type PokemonTypes = Flying | Poison | Water | Ice | Electric | Normal

type alias Enemy = {
  id: Number,
  enemies: Array Number
}

*/

// Number -> Number
const square = x => Math.pow(x, 2)

// [x, y] -> Number
const diffPoints = R.apply(R.subtract)

// [x, y] -> [x, y] -> [Number, Number]
const squaredSubtract = R.compose(R.map(square), R.map(diffPoints))

// [x, y] -> [x, y] -> Number
const calculateDistance = R.curry(
  R.compose(Math.sqrt, R.sum, squaredSubtract, R.zip)
)

const findPikachuPosition = () => {}
const closestPokemonName = () => {}
const distanceBetweenPokemons = () => {}
const validateEnemiesMap = () => {}
const createEnemies = () => {}

module.exports = {
  findPikachuPosition: findPikachuPosition,
  closestPokemonName: closestPokemonName,
  distanceBetweenPokemons: distanceBetweenPokemons,
  validateEnemiesMap: validateEnemiesMap,
  createEnemies: createEnemies
}
