/*

type alias Pokemon = {
  id: Number,
  name: String,
  type: PokemonTypes,
  position: [Number, Number]
}

type PokemonTypes = Flying | Poison | Water | Ice | Electric | Normal

*/

function getPosition (definition) {
	return definition.position
}

function getPokemonDefinition (Pokemons, name) {
	return Pokemons.find(pokemon => pokemon.name === name)
}

function calculateCoordinateDistance (a, b, pos) {
	return mathSquareRoot(mathSquare(a.position[pos] + b.position[pos]))
}

function mathSquare(num) {
	return Math.pow(num)
}

function mathSquareRoot(num) {
	return Math.sqrt(num)
}

const findPikachuPosition = (Pokemons) => {
	const pikachuDefinition = getPokemonDefinition(Pokemons, 'Pikachu')
	return getPosition(pikachuDefinition)
}

const closestPokemonName = () => {}
const distanceBetweenPokemons = (a, b) => {
	const yDist = calculateCoordinateDistance(a, b, 1)
	const xDist = calculateCoordinateDistance(a, b, 0)

	return mathSquareRoot(mathSquare(xDist) + mathSquare(yDist))
	// get the positions for each pokemons and then calculate the vector between the 2 based on their positions
}
const validateEnemiesMap = () => {}
const createEnemies = () => {}

module.exports = {
  findPikachuPosition: findPikachuPosition,
  closestPokemonName: closestPokemonName,
  distanceBetweenPokemons: distanceBetweenPokemons,
  validateEnemiesMap: validateEnemiesMap,
  createEnemies: createEnemies
}
