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

function calculateCoordinateDistance (a, b, axis) {
	return mathSquareRoot(mathSquare(a[axis] - b[axis]))
}

function mathSquare(num) {
	return Math.pow(num, 2)
}

function mathSquareRoot(num) {
	return Math.sqrt(num)
}

function contains (array, value) {
	return array.indexOf(value) > -1
}

function allConditionsTrue(array, test) {
	return array.every(test)
}

const findPikachuPosition = (Pokemons) => {
	const pikachuDefinition = getPokemonDefinition(Pokemons, 'Pikachu')
	return getPosition(pikachuDefinition)
}

const closestPokemonName = (Pokemons, position) => {
	let minDistance = 0
	let name = ''
	Pokemons.forEach((pokemon) => {
		const distance = distanceBetweenPokemons(pokemon, { position })
		if (minDistance === 0 || distance < minDistance) {
			minDistance = distance
			name = pokemon.name
		}
	})

	return name
}
const distanceBetweenPokemons = (a, b) => {
	const yDist = calculateCoordinateDistance(a.position, b.position, 1)
	const xDist = calculateCoordinateDistance(a.position, b.position, 0)

	return mathSquareRoot(mathSquare(xDist) + mathSquare(yDist))
	// get the positions for each pokemons and then calculate the vector between the 2 based on their positions
}

const validateEnemiesMap = (enemiesMap) => {
	return allConditionsTrue(
			Object.keys(enemiesMap),
			force => allConditionsTrue(
				enemiesMap[force],
				antagonism => contains(enemiesMap[antagonism], force))
			)
}

const createEnemies = (Pokemons, enemiesMap) => {
	return Pokemons.map(pokemon => {
		return Pokemons
		.filter(ennemy => ennemy.id !== pokemon.id)
		.filter(ennemy => contains(enemiesMap[pokemon.type], ennemy.type))
		.map(ennemy => ennemy.id)
	}).reduce((acc, value, index) => {
		acc[index + 1] = value
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
