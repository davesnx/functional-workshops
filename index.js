// const {
//   compose,
//   find
// } = require('barely-functional')
const {
  apply,
  map,
  get,
  matchesProperty,
  compose,
  find
} = require('lodash/fp')
/*

type alias Pokemon = {
  id: Number,
  name: String,
  type: PokemonTypes,
  position: [Number, Number]
}

type PokemonTypes = Flying | Poison | Water | Ice | Electric | Normal

*/
// utils
// const get = (prop) => (o) => o && o[prop]

const getName = get('name')
const getPosition = get('position')
const getType = get('type')

const distance = ([p0, p1], [q0, q1]) => {
  return Math.sqrt(
    Math.pow(p0 - q0, 2) + Math.pow(p1 - q1, 2)
  )
}

const getEnemies = (type, enemiesMap) => enemiesMap[type]
const findEnemies = (pokemon, enemies) => {
  return pokemon.filter((pokemon) => enemies.includes(getType(pokemon)))
    .map(get('id'))
}

const findByName = (name) => find(matchesProperty('name', name))






// Code
const findPikachuPosition = compose(
  get('position'),
  findByName('Pikachu')
)

const closestPokemonName = (pokemons, target) => {
  return pokemons.reduce((min, p, i) => {
    if (i === 0) {
      return {
        distance: distance(p.position, target),
        position: getPosition(p),
        name: getName(p)
      }
    } else {
      const d = distance(p.position, target)
      return d < min.distance
        ? {
          distance: d,
          position: getPosition(p),
          name: getName(p)
        }
        : min
      return min
    }
  }, {}).name
}
const distanceBetweenPokemons = compose(
  apply(distance),
  map(getPosition),
  Array.of
)

const validateEnemiesMap = (enemiesMap) => {
  let valid = true
  Object.keys(enemiesMap).forEach((kind) => {
    enemiesMap[kind].forEach((enemy) => {
      if (!enemiesMap[enemy].includes(kind)) {
        valid = false
      }
    })
  })
  return valid
}
const createEnemies = (pokemons, enemiesMap) => {
  return pokemons.reduce((acc, pokemon) => {
    const enemies = getEnemies(getType(pokemon), enemiesMap)
    acc[get('id')(pokemon)] = findEnemies(pokemons, enemies)
    return acc
  }, {})
}

module.exports = {
  findPikachuPosition: findPikachuPosition,
  closestPokemonName: closestPokemonName,
  distanceBetweenPokemons: distanceBetweenPokemons,
  validateEnemiesMap: validateEnemiesMap,
  createEnemies: createEnemies
}
