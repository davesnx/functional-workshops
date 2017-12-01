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

// Pokemon -> Pokemon
const isPikachu = R.propEq('name', 'Pikachu')

// Array Pokemon -> Pokemon
const findPikachu = R.find(isPikachu)

// Pokemon -> [x, y]
const getPosition = R.prop('position')

// Pokemon -> Number
const getId = R.prop('id')

// Pokemon -> String
const getName = R.prop('name')

// Pokemon -> String
const getType = R.prop('type')

// Pokemon -> Pokemon
const sameType = R.propEq('type')

// Number -> Number
const square = x => Math.pow(x, 2)

// [x, y] -> Number
const diffPoints = R.apply(R.subtract)

// [x, y] -> [x, y] -> [Number, Number]
const squaredSubtract = R.compose(R.map(square), R.map(diffPoints))

// [x, y] -> [x, y] -> Number
const distance = R.curry(R.compose(Math.sqrt, R.sum, squaredSubtract, R.zip))

// Pokemon -> [x, y] -> Number
const distancePokemon = position => R.pipe(getPosition, distance(position))

// String -> Array Object { String } -> Object
const smallestBy = propName => {
  return R.reduceRight(R.minBy(R.prop(propName)), { [propName]: Infinity })
}

// Array Pokemon -> [x, y] -> Pokemon
const closestPokemon = (pokemonList, position) => {
  const calculateDistance = distancePokemon(position)
  const distance = R.lensProp('distance')
  const addDistance = pokemon =>
    R.set(distance, calculateDistance(pokemon), pokemon)
  const distancePokemonList = R.map(addDistance, pokemonList)
  return smallestBy('distance')(distancePokemonList)
}

// Pokemon -> String
const getEnemy = R.prop('enemy')

// Pokemon -> Pokemon
const enemy = pokemon => ({
  type: getEnemy(pokemon),
  enemy: getType(pokemon)
})

// EnemiesMap -> Pokemon -> Boolean
const areEnemies = R.curry((enemiesMap, pokemon) => {
  return R.contains(enemy(pokemon), enemiesMap)
})

// Array Number -> Array Number
const orderAsc = R.sort(R.gt)

// Enemy -> Enemy
const isSameType = R.pipe(getType, sameType)

// Array Pokemon
const takeEnemy = R.curry((pokemons, enemyType) => {
  return R.filter(sameType(enemyType))(pokemons)
})

// Array Pokemon -> EnemiesMap -> Pokemon -> Array Number
const getEnemies = R.curry((pokemonList, enemiesMap, pokemon) => {
  const getSameType = R.filter(isSameType(pokemon))
  const enemyRelations = R.pipe(getSameType, R.map(getEnemy))(enemiesMap)
  const takeEnemiesId = R.pipe(takeEnemy(pokemonList), R.map(getId))

  const enemiesId = R.map(takeEnemiesId, enemyRelations)
  return R.pipe(R.flatten, orderAsc)(enemiesId)
})

// Array Pokemon -> [x, y]
// check each pokemon on the list and ask if his name is pikachu
const findPikachuPosition = R.pipe(findPikachu, getPosition)

// Array Pokemon -> [x, y] -> String
// calculate position of each pokemon and get the one that is closer
const closestPokemonName = R.pipe(closestPokemon, getName)

// Pokemon -> Pokemon -> Number
// calculate the distance between his positions
const distanceBetweenPokemons = R.pipe(
  Array.of,
  R.map(getPosition),
  R.apply(distance)
)

// EnemiesMap -> Boolean
// is valid when all the enemies have his reverse on the list
const validateEnemiesList = enemiesMap => {
  return R.all(areEnemies(enemiesMap), enemiesMap)
}

// Array Pokemon, enemiesMap -> Array Enemy
// get each pokemon type of the list
// according to enemiesMap, get his enemies
// add enemies and pokemon id on a list
const createEnemies = (pokemonList, enemiesMap) => {
  const createEnemy = R.applySpec({
    id: R.prop('id'),
    enemies: getEnemies(pokemonList, enemiesMap)
  })
  return R.map(createEnemy, pokemonList)
}

module.exports = {
  findPikachuPosition: findPikachuPosition,
  closestPokemonName: closestPokemonName,
  distanceBetweenPokemons: distanceBetweenPokemons,
  validateEnemiesList: validateEnemiesList,
  createEnemies: createEnemies
}
