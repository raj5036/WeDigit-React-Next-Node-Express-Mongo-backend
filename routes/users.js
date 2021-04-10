const express=require('express');
const router=express.Router()

//Bring in User Model
let User=require('../models/user')

//Get all users
router.get('/',(req,res)=>{
    User.find({},(error,users)=>{
        if(error){
            throw new Error(err)
        }
        else{
            return res.status(200).json(users)
        }
    });
});


router.post('/signin',(req,res)=>{
    User.findOne({email:req.body.email})
    .then((response)=>{
        console.log(response)
        if(response.password!==req.body.password){
            console.log(`wrong password`)
            return res.status(400).json({msg:`wrong password`})
        }
        else{
            console.log(`Success`)
            res.cookie('sessionEmail',req.body.email) //Use Email as session variables
            
            return res.status(200).json({msg:`success`})
        }
    })
    .catch(err=>console.log(err))
})


router.post('/register',(req,res)=>{
    let user=new User()
    user.name=req.body.name
    user.email=req.body.email
    user.password=req.body.password

    if(!user.name || !user.email || !user.password){
        return res.status(400).json({msg :`You must provide your name,email and a password`})
    }
    console.log(`user ${user}`)

    user.save((err)=>{
        if(err) throw new Error(err)
        else{
            res.status(200)
        }
        res.end()
    });
})

router.post('/logout',(req,res)=>{
    const {cookies}=req
    res.clearCookie('sessionEmail')
})

module.exports=router;