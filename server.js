const express = require('express')
const port = 5000
const server = express()
//DATABASE ( FAKE ) 
const db = require("./database")

// Needed in order for Express to parse out JSON bodies 
server.use( express.json() )

server.get('/', (req,res) => {
   res.send('Hello World')
})

server.listen( port, () => {
   console.log(`listening on port ${port}`)
})

// BEGIN FUNCTIONS------------------------

// GET
server.get("/users", (req, res) => {
   const users = db.getUsers()
   if(users){
      res.json(users)
   }else{
      res.status(500).json( { errorMessage: "Information could not be retrieved" } )
   }
})

// GET BY ID
server.get('/users/:id', (req,res) => {
   const id = req.params.id
   const user = db.getUsersById(id)

   if(user){
      res.json(user)
   }else {
      res.status(404).json( { message: "Could not retrieve user information" } )
   }
})

// POST
server.post('/users', (req,res) => {

   if( req.body.name && req.body.bio) {
      try{ 
         const newUser = db.createUser( { name: req.body.name, bio : req.body.bio} )
         res.status(201).json(newUser) // 201 = resource created
      }catch{
         res.status(500).json( { errorMessage: "Error while saving to database" } )
      }

   }else{
      res.status(400).json( { errorMessage: " Please provide name and bio"} )
   }  
})

// PUT
server.put('/users/:id', (req,res)=> {
   const id = req.params.id
   const user = db.getUsersById(id)

   if(user) {

      if( !req.body.name || !req.body.bio){
         
      }
      const updateduser = db.updateUser( id, { name: req.body.name } )
      res.json(updateduser)
   }else{
      res.status(404).json( { message: "User id not found"} )
   }
})

// DELETE
server.delete('/users/:id', (req,res) => {
   const id = req.params.id
   const user = db.getUsersById(id)

   if(user) {
      db.deleteUser(id)
      res.status(204).end() // successful empty response
   }else{
      res.status(404).json( {message: "User not found: could not be removed"} ) 
   }
})