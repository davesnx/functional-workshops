/*

type alias Pokemon = {
  id: Number,
  name: String,
  type: PokemonTypes,
  position: [Number, Number]
}

type PokemonTypes = Flying | Poison | Water | Ice | Electric | Normal

*/

const getDistance = (x, y, a, b) => {
  const xDelta = Math.max(x, a) - Math.min(x, a)
  const yDelta = Math.max(y, b) - Math.min(y, b)

  const zSq = xDelta ** 2 + yDelta ** 2

  return Math.sqrt(zSq)
}


const findPikachuPosition = (pokemons) => {
  const pikachu = pokemons.find(pokemon => {
    if (pokemon.name === 'Pikachu') {
      return pokemon.position
    }
  })
  return pikachu.position
}

const distanceBetweenPokemons = (pok1, pok2) => {
  const [x, y] = pok1.position
  const [a, b] = pok2.position

  return getDistance(x, y, a, b)
}

const closestPokemonName = (pokemons, position) => {
  const distances = pokemons.reduce((result, opponent) => {
    const distance = getDistance(...position, ...opponent.position)
    result[distance] = opponent.name
    return result
  }, {})

  const closest = Math.min(...Object.keys(distances).map(parseFloat))

  return distances[closest]
}

const validateEnemiesMap = (enemiesMap) => {
  const types = Object.keys(enemiesMap)
  const assertions = types.reduce((result, type) => {
    const enemies = enemiesMap[type]
    enemies.forEach(enemyType => {
      const isIncluded = enemiesMap[enemyType].includes(type)
      result.push(isIncluded)
    })
    return result
  }, [])
  return assertions.every(a => a === true)
}

const createEnemies = (pokemons, enemiesMap) => {
  const enemies = {}
  pokemons.forEach(p => {
    enemies[p.id] = []
  })

  Object.keys(enemiesMap).forEach(type => { // Normal
    const pokemonsOfType = pokemons.filter(p => p.type === type) // [{ name: Rattata }]
    pokemonsOfType.forEach(p => {
      const enemyTypes = enemiesMap[p.type]
      pokemons.forEach(opponent => {
        if (enemyTypes.includes(opponent.type)) {
          enemies[p.id].push(opponent.id)
        }
      })
    }) // [{name: Rattata}]
  })

  return enemies
}

module.exports = {
  findPikachuPosition: findPikachuPosition,
  closestPokemonName: closestPokemonName,
  distanceBetweenPokemons: distanceBetweenPokemons,
  validateEnemiesMap: validateEnemiesMap,
  createEnemies: createEnemies
}
