const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/art')
  .then(() => console.log('Connected!'));

app.get('/', (req, res)=>{
    res.send('Working')
})

app.listen(port, ()=>{console.log(` Serving on ${port}. Press ctl + c to exit`)})
