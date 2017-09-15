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
const get = (prop) => (o) => o && o[prop]

const getPosition = get('position')
const getType = get('type')

const chekPokemonName = (name) =>
  (pokemon) => get('name')(pokemon) === name

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

// Code
const findPikachuPosition = (pokemons) => {
  return getPosition(
    pokemons.find(chekPokemonName('Pikachu'))
  )
}
const closestPokemonName = (pokemons, target) => {
  const getName = get('name')
  const getPosition = get('position')
  let min = {
    distance: null,
    position: null,
    name:null
  }
  pokemons.forEach((p, i) => {
    if (i === 0) {
      min = {
        distance: distance(p.position, target),
        position: getPosition(p),
        name: getName(p)
      }
    } else {
      const d = distance(p.position, target)
      if (d < min.distance) {
        min = {
          distance: d,
          position: getPosition(p),
          name: getName(p)
        }
      }
    }
  })
  return min.name
}
const distanceBetweenPokemons = (poke, mon) => {
  return distance(
    getPosition(poke),
    getPosition(mon)
  )
}
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
