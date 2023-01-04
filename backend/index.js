const conectToMongo=require('./db');
const express = require('express')
var cors = require('cors')
 conectToMongo(); 
 
 const app = express()
 app.use(cors())
const port = 5000
app.use(express.json())// use for  sending req in json 
//avai;ab;e routes
app.use('/api/auth',require('./routes/auth'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/notes',require('./routes/notes'))
app.listen(port, () => {
  console.log(`cloud backend listening on port ${port}`)
})
