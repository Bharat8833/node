const mongoose = require('mongoose');

const data= async()=>{
     const url ='mongodb://127.0.0.1:27017/movie';
     const conect = await mongoose.connect(url);

};
 data();

 const emp = new mongoose.Schema({
    id : Number,
    moviename :{
     type:String,
     required:true,
     unique:false
    }, 
    date : String,
    charactor : Number,   
    pimage :String
})

const model = new mongoose.model('mdetail', emp);

module.exports = model;