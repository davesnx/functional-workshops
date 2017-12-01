// Pure

const isSancho = user => user.name === 'Sancho'

// List User
const getSanchoUser = users => {
  return users.filter(isSancho)
}

//
const getSanchoUserInpure = () => {
  const users = db.getUsers()
  return users.filter(isSancho)
}
