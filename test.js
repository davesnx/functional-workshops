const {
  findPikachuPosition,
  closestPokemonName,
  distanceBetweenPokemons,
  validateEnemiesList,
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
  })

  describe('Pokemon enemies', () => {
    const enemyRelationList = [
      { type: 'Normal', enemy: 'Flying' },
      { type: 'Normal', enemy: 'Poison' },
      { type: 'Water', enemy: 'Poison' },
      { type: 'Water', enemy: 'Ice' },
      { type: 'Flying', enemy: 'Normal' },
      { type: 'Flying', enemy: 'Ice' },
      { type: 'Poison', enemy: 'Normal' },
      { type: 'Poison', enemy: 'Water' },
      { type: 'Ice', enemy: 'Flying' },
      { type: 'Ice', enemy: 'Water' }
    ]

    const wrongEnemyRelationList = [
      { type: 'Normal', enemy: 'Flying' },
      { type: 'Ice', enemy: 'Water' }
    ]

    it('validates that each enemy has his own type and vicebersa', () => {
      expect(validateEnemiesList(enemyRelationList)).toBeTruthy()
      expect(validateEnemiesList(wrongEnemyRelationList)).toBeFalsy()
    })

    it('should generate the enemies of each Pokemon', () => {
      const enemies = createEnemies(Pokemons, enemyRelationList)

      const mockEnemies = [
        { id: 1, enemies: [4, 7, 8, 9, 10] },
        { id: 2, enemies: [4, 5, 6, 7, 8, 9] },
        { id: 3, enemies: [4, 5, 6, 7, 8, 9] },
        { id: 4, enemies: [1, 2, 3] },
        { id: 5, enemies: [2, 3, 10] },
        { id: 6, enemies: [2, 3, 10] },
        { id: 7, enemies: [1, 2, 3] },
        { id: 8, enemies: [1, 2, 3] },
        { id: 9, enemies: [1, 2, 3] },
        { id: 10, enemies: [1, 5, 6] },
        { id: 11, enemies: [] }
      ]

      expect(enemies).toEqual(mockEnemies)
    })
  })
})
