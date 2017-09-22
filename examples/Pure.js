// Pure

const isSancho = user => user.name === 'Sancho'

const pure = users => {
  return users.filter(isSancho)
}

const inpure = () => {
  const users = db.getUsers()
  return users.filter(isSancho)
}
