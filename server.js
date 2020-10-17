const express = require('express')
const port = 5000
const server = express()

server.get('/', (req,res) => {
   res.send('Hello World')
})

server.listen( port, () => {
   console.log(`listening on port ${port}`)
})