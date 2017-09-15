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
    expect(findPikachuPosition(Pokemons)).toEqual(pikachuPosition)
    // receive the pokemons definitions, and try and find the one that is named pikachu
    // then search for the positions of the one named Pikachu
  })

  it('should get the distance between 2 pokemons', () => {
    const Gyarados = Pokemons[4]
    const Magikarp = Pokemons[5]

    expect(distanceBetweenPokemons(Magikarp, Gyarados)).toEqual(5)
  })

  it('should find the closest Pokemon given a position', () => {
    const position = [4, 29]
    const pokemonName = 'Rattata'
    const firstPokemon = Pokemons[0].name

    expect(closestPokemonName(Pokemons, position)).toEqual(pokemonName)
    expect(closestPokemonName(Pokemons, position)).not.toEqual(firstPokemon)
    // for each pokemons, look up their position and calculate the distance based on the given position
    // maintain an object that gets updated everytime we find a new closest distance
    // at the end of the whole pokemon list, return the closest distance
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
      expect(validateEnemiesMap(enemiesMap)).toBeTruthy()
      // for each current key,
      // test that the keys mapped as ennemies also contain the current key
      // return false if it's not the case
    })

    xit('should generate the enemies of each Pokemon', () => {
      const enemies = createEnemies(Pokemons, enemiesMap)

      const mockEnemies = {
        1: [4, 7, 8, 9],
        2: [4, 5, 6, 7, 8, 9],
        3: [4, 5, 6, 7, 8, 9],
        4: [1, 2, 3],
        5: [2, 3],
        6: [2, 3],
        7: [1, 2, 3],
        8: [1, 2, 3],
        9: [1, 2, 3],
        10: [1, 5, 6],
        11: []
      }

      expect(enemies).toEqual(mockEnemies)
      // checking each pokemon, based on its type,
      // it should look through all the avaiable Pokemons
      // and map the pokemon as an ennemy if its type matches the rivality
    })
  })
})
