const express=require('express');

const router=express.Router()

//Bring in User Model
let Data=require('../models/data')

//Get all users
router.get('/',(req,res)=>{
    Data.find({},(error,data)=>{
        if(error){
            throw new Error(err)
        }
        else{
            return res.status(200).json(data)
        }
    });
});

//Get posts of a certain user
router.get('/userposts',(req,res)=>{
    //let email=req.session.sessionEmail
    let email=req.body.email
    Data.find({user:email},(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            return res.status(200).json(result)
        }
    })
    //console.log(req.session.sessionEmail)
})

function validateUser(req,res,next){
    const {cookies}=req

    if('sessionEmail' in cookies){
        console.log(`sessionEmail exists : ${cookies.sessionEmail}`)
        next()
    }else{
        res.status(403).send({msg:`forbiden request.User must be authenticated`})
    }
}

router.post('/post',(req,res)=>{
    let data=new Data()
    // user.name=req.body.name
    // user.email=req.body.email
    // user.password=req.body.password
    const {title,body,user,date}=req.body

    data.title=title
    data.body=body
    data.user=user
    data.date=date
    // if(!user.name || !user.email || !user.password){
    //     return res.status(400).json({msg :`You must provide your name,email and a password`})
    // }
    // console.log(`user ${user}`)

    data.save((err)=>{
        if(err) throw new Error(err)
        else{
            res.status(200).json({ msg:`post saved in MongoDB` })
        }
        res.end()
    });
})

module.exports=router