const mongoose=require('mongoose');

//UserModel Definition
const DataSchema=mongoose.Schema({
    
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        required:true,
    }
})

const Data=module.exports=mongoose.model('Data',DataSchema,'data')
