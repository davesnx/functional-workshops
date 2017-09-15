var R = require('ramda')

/*

type alias Pokemon = {
  id: Number,
  name: String,
  type: PokemonTypes,
  position: [Number, Number]
}

type PokemonTypes = Flying | Poison | Water | Ice | Electric | Normal

*/

const dist = ([x1, y1], [x2, y2]) => {
  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
  )
}

const isPikachu = p => R.prop('name', p) === 'Pikachu'

const findPikachuPosition = (pokemons) => {
  return R.pipe(
    R.filter(isPikachu),
    R.head,
    R.prop('position')
  )(pokemons)
}

const closestPokemonName = (pokemons, [x, y]) => {
  return pokemons.map(p => (
    {
      name: p.name,
      distance: dist(p.position, [x, y])
    }
  )).sort((a, b) => {
    return a.distance - b.distance
  })[0].name
}

const distanceBetweenPokemons = (firstPokemon, secondPokemon) => {
  var [x1, y1] = firstPokemon.position
  var [x2, y2] = secondPokemon.position
  
  return dist([x1, y1], [x2, y2])
}

const validateEnemiesMap = (enemiesMap) => {
  return Object.keys(enemiesMap)
  .map(enemy => 
    enemiesMap[enemy]
    .find(l => 
      enemiesMap[l].indexOf(enemy) <= -1
    )
  )
  .every(x => !x)
}

const createEnemies = (pokemons, enemiesMap) => {
  return pokemons
  .sort(x => x.id)
  .reduce((acc, p) => {
    const enemies = enemiesMap[p.type]
    .reduce((accum, enemyType) => {
      const enemiesIdsArray = pokemons
        .filter(x => x.type === enemyType)
        .map(p => p.id)
      accum = accum.concat(enemiesIdsArray ? enemiesIdsArray : [])
      return accum
    }, [])

    acc[p.id] = enemies.sort((a, b) => a - b)
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
