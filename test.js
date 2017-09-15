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
    const pikachuPosition = [123, 55]
    /*
      find the object in the array where name is Pikachu and get its position
     */
    expect(findPikachuPosition(Pokemons)).toEqual(pikachuPosition)
  })

  it('should get the distance between 2 pokemons', () => {
    const Gyarados = Pokemons[4]
    const Magikarp = Pokemons[5]
    /*
    Get position of each pokemon and calculate distance sqrt(Math.abs(x - x') + Math.abs(y - y'))
     */

    expect(distanceBetweenPokemons(Magikarp, Gyarados)).toEqual(5)
  })

  it('should find the closest Pokemon given a position', () => {
    /*
    Calculate all distances refered to the targeted position, find the smaller one.
     */
    const position = [4, 29]
    const pokemonName = 'Rattata'
    const firstPokemon = Pokemons[0].name

    expect(closestPokemonName(Pokemons, position)).toEqual(pokemonName)
    expect(closestPokemonName(Pokemons, position)).not.toEqual(firstPokemon)
  })

  describe('Pokemon enemies', () => {
    const enemiesMap = {
      Normal: ['Flying', 'Poison'],
      Water: ['Poison', 'Ice'],
      Flying: ['Normal', 'Ice'],
      Poison: ['Normal', 'Water'],
      Ice: ['Flying', 'Water'],
      Electric: []
    }

    it('validates that enemiesMap make sense', () => {
      /*
      check that each value in an array for a key in the map includes the key in their values
       */
      expect(validateEnemiesMap(enemiesMap)).toBeTruthy()
    })

    it('should generate the enemies of each Pokemon', () => {
      /*
        for each pokemon, find all the other ones according to the kinds described in the enemiesmap
       */
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
