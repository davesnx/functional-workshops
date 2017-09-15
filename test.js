const {
  findPikachuPosition,
  closestPokemonName,
  distanceBetweenPokemons,
  validateEnemiesMap,
  createEnemies
} = require('./index')

const Pokemons = [
  {
    id: 1,
    type: 'Flying',
    name: 'Pidgey',
    position: [27, 90]
  },
  {
    id: 2,
    type: 'Poison',
    name: 'Nidoran',
    position: [66, 12]
  },
  {
    id: 3,
    type: 'Poison',
    name: 'Bell sprout',
    position: [99, 99]
  },
  {
    id: 4,
    type: 'Normal',
    name: 'Mewtwo',
    position: [24, 12]
  },
  {
    id: 5,
    type: 'Water',
    name: 'Magikarp',
    position: [4, 3]
  },
  {
    id: 6,
    type: 'Water',
    name: 'Gyarados',
    position: [0, 0]
  },
  {
    id: 7,
    type: 'Normal',
    name: 'Rattata',
    position: [5, 30]
  },
  {
    id: 8,
    type: 'Normal',
    name: 'Rattata',
    position: [80, 44]
  },
  {
    id: 9,
    type: 'Normal',
    name: 'Zubat',
    position: [81, 46]
  },
  {
    id: 10,
    type: 'Ice',
    name: 'Lapras',
    position: [20, 94]
  },
  {
    id: 11,
    type: 'Electric',
    name: 'Pikachu',
    position: [123, 55]
  }
]

describe('Pikachu Test Suite', () => {
  it(`should find Pikachu's position`, () => {
    // It should loop through every pokemon and if
    // the name is `Pikachu`, it should return the position

    const pikachuPosition = [123, 55]

    expect(findPikachuPosition(Pokemons)).toEqual(pikachuPosition)
  })

  it('should get the distance between 2 pokemons', () => {
    // It calculate the difference between each x and y value
    // to get 2 deltas, then the distance between them is the
    // square root of x^2 * y^2

    const Gyarados = Pokemons[4]
    const Magikarp = Pokemons[5]

    expect(distanceBetweenPokemons(Magikarp, Gyarados)).toEqual(5)
  })

  it('should find the closest Pokemon given a position', () => {
    // It should loop through every pokemon and get the hypotenuse
    // as in the previous test, then return the name of the pokemon with
    // the smallest distance from Rattata

    const position = [4, 29]
    const pokemonName = 'Rattata'
    const firstPokemon = Pokemons[0].name

    expect(closestPokemonName(Pokemons, position)).toEqual(pokemonName)
    expect(closestPokemonName(Pokemons, position)).not.toEqual(firstPokemon)
  })

  describe('Pokemon enemies', () => {
    // It should loop through each key of enemiesMap, call this X, then
    // it should go through each of its values, Y, and check that X is in enemiesMap[Y]

    const enemiesMap = {
      Normal: ['Flying', 'Poison'],
      Water: ['Poison', 'Ice'],
      Flying: ['Normal', 'Ice'],
      Poison: ['Normal', 'Water'],
      Ice: ['Flying', 'Water'],
      Electric: []
    }

    it('validates that enemiesMap make sense', () => {
      expect(validateEnemiesMap(enemiesMap)).toBeTruthy()
    })

    it('should generate the enemies of each Pokemon', () => {
      // It should loop through each of the pokemon, P, and add its ID to object O.
      // Then it should look through enemiesMap, and add any pokemons with type enemiesMap[P.type]

      const enemies = createEnemies(Pokemons, enemiesMap)

      const mockEnemies = {
        1: [4, 7, 8, 9, 10],
        2: [4, 5, 6, 7, 8, 9],
        3: [4, 5, 6, 7, 8, 9],
        4: [1, 2, 3],
        5: [2, 3, 10],
        6: [2, 3, 10],
        7: [1, 2, 3],
        8: [1, 2, 3],
        9: [1, 2, 3],
        10: [1, 5, 6],
        11: []
      }

      expect(enemies).toEqual(mockEnemies)
    })
  })
})
