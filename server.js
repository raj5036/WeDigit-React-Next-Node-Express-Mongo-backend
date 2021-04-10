const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/wedigit', {useNewUrlParser: true, useUnifiedTopology: true})
let db=mongoose.connection

db.once('open',()=>{
    console.log(`Connected to MongoDB`)
});
db.on('error',(error)=>{console.log(error)}) //Check for error


app.use('/api/users',require('./routes/users'))
app.use('/api/data',require('./routes/data'))

app.listen(3001,()=>{
    console.log(`Server up and running at 3001`)
})

