/*

 type alias Pokemon = {
 id: Number,
 name: String,
 type: PokemonTypes,
 position: [Number, Number]
 }

 type PokemonTypes = Flying | Poison | Water | Ice | Electric | Normal
 */

// calculate the square root of
const checkDistance = (first, second) => {
  return Math.sqrt(Math.pow((first[0] - second[0]), 2) + Math.pow((first[1] - second[1]), 2))
}

// ask all the pokemons if they are Pikachu and return position of pikachu
const findPikachuPosition = (pokemons) => pokemons
  .find(pokemon => pokemon.name === 'Pikachu')
  .position

// check the distance between each pokemon and position given and return the biggest
const closestPokemonName = (pokemons, position) => pokemons
  .map(pokemon => ({
    name: pokemon.name,
    distance: checkDistance(pokemon.position, position)
  }))
  .sort((a, b) => a.distance - b.distance)[0]
  .name

// calculate the distance between two pokemons
const distanceBetweenPokemons = (pokemon1, pokemon2) => checkDistance(pokemon1.position, pokemon2.position)

// for all the objectkeys check the related array
// and check if the keys of the object

const validateEnemiesMap = (enemiesMap) => {
  let isValid = true
  Object.keys(enemiesMap).forEach((key) => {
    if (enemiesMap[key].forEach(enemy => !enemiesMap[enemy].includes(key))) {
      isValid = false
    }
  })
  return isValid
}

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

const createEnemies = (pokemons, enemiesMap) => {
  const poks = pokemons
    .map(pokemon => ({
      id: pokemon.id,
      enemies: enemiesMap[pokemon.type]
        .map(enemyKind => pokemons
          .filter(pok => pok.type === enemyKind)
          .map(enemy => enemy.id)
        )
    }))
    .map(pok => {
      const finalObject = {}
      finalObject[pok.id] = flatten(pok.enemies).sort((a, b) => (a - b))
      return finalObject
    })
  return Object.assign({}, ...poks)
}

module.exports = {
  findPikachuPosition: findPikachuPosition,
  closestPokemonName: closestPokemonName,
  distanceBetweenPokemons: distanceBetweenPokemons,
  validateEnemiesMap: validateEnemiesMap,
  createEnemies: createEnemies
}
