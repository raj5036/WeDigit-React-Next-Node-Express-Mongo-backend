const express=require('express')
const app=express()
const cors=require('cors')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const session=require('express-session')

app.use(cookieParser())
app.use(session({secret:'603607e0226c9916057aa56b7b9c9b93e95a0ee3f4f97f2f5250c860311f84e495ba0fbd467d512d39b2786efc00a233239c2cba3a35146db5eed56839eef766'}))
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

