const shortid = require('shortid')

let users = [
   {
      id: shortid.generate(), 
      name: "Person Number 1", 
      bio: "Bio Number 1",  
    },
    {
      id: shortid.generate(), 
      name: "Person Number 2", 
      bio: "Bio Number 2",  
    },
    {
      id: shortid.generate(), 
      name: "Person Number 3", 
      bio: "Bio Number 3",  
    }
]

module.exports = {
   getUsers,
   getUsersById,
   createUser,
   updateUser,
   deleteUser
}


// GET ========================================
function getUsers() {
   return users
}
// GET BY ID ==================================
function getUsersById(id) {
   return users.find( user => user.id === id )
}

// POST / CREATE USER =========================
function createUser(data) {
   // create new user
   const newUser = {
      id: shortid.generate(),
      ...data
   }
   // add to array
   users.push(newUser)
   return newUser
}

// PUT ========================================
function updateUser(id, data) {
   const index = users.findIndex( user => user.id === id)

   users[index] = { ...users[index], ...data }
   return users[index]
}

// DELETE ======================================
function deleteUser(id) {
   users = users.filter( user => user.id !== id )
}
