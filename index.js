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

const isPikachu = R.propEq('name', 'Pikachu')
const findPikachu = R.pipe(
  R.filter(isPikachu), 
  R.head
)
const takePokemonPosition = R.prop('position')
const findPikachuPosition = (pokemons) => {
  return R.pipe(
    findPikachu,
    takePokemonPosition
  )(pokemons)
}

const takePokemonName = R.prop('name')
const pokemonDistanceToPoint = ([x, y]) => p => dist(R.prop('position', p), [x, y])
const defaultPokemon = { position: [Infinity, Infinity] }

const closestPokemonName = (pokemons, [x, y]) => {
  return R.pipe(
    R.reduce(R.minBy(pokemonDistanceToPoint([x, y])), defaultPokemon),
    takePokemonName
  )(pokemons)
}

const distanceBetweenPokemons = (firstPokemon, secondPokemon) => {
  var [x1, y1] = firstPokemon.position
  var [x2, y2] = secondPokemon.position
  
  return dist([x1, y1], [x2, y2])
}

const isEnemyExist = enemiesMap => x => y => R.contains(x, R.prop(y)(enemiesMap))
const validateEnemiesMap = (enemiesMap) => {
  return R.pipe(
    R.toPairs,
    R.all(([x, list]) => 
      R.all(y => isEnemyExist(enemiesMap, x, y), list)
    )
  )(enemiesMap)
}

const takePokemonType = R.prop('type')
const takePokemonId = R.prop('id')
const takePokemonIds = R.map(takePokemonId)
const takeTypeEnemies = R.curry((enemiesMap, type) => R.prop(type, enemiesMap))
const takeIdsForTypes = R.curry((pokemons, types) => R.pipe(
  R.innerJoin((pokemon, type) => pokemon.type === type),
  R.map(p => takePokemonId(p))
)(pokemons, types))

const createEnemies = (pokemons, enemiesMap) => {
  return R.pipe(
    R.map(takePokemonType),
    R.map(takeTypeEnemies(enemiesMap)),
    R.map(takeIdsForTypes(pokemons)),
    R.zipObj(takePokemonIds(pokemons))
  )(pokemons)
}

module.exports = {
  findPikachuPosition: findPikachuPosition,
  closestPokemonName: closestPokemonName,
  distanceBetweenPokemons: distanceBetweenPokemons,
  validateEnemiesMap: validateEnemiesMap,
  createEnemies: createEnemies
}
