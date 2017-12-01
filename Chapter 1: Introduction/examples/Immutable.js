const house = {
  size: 3000,
  name: 'La Casa de la Padera'
}

house.name = 'La Casa de la Pradera'

console.log(house)

// [Object]{
//   size: 3000,
//   name: 'La Casa de la Pradera'
// }

const house2 = {
  size: 3000,
  name: 'La Casa de la Padera'
}

const house3 = Object.assign(house2, { name: 'La Casa de la Pradera' })

console.log(house3)

// [Object]{
//   size: 3000,
//   name: 'La Casa de la Pradera'
// }
