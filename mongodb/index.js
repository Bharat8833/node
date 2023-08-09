

const express=require('express');

const app=express();

app.set('view engine', 'ejs');

const body = require('body-parser');
const bs = body.urlencoded({extended: true});

const mongo = require('mongodb');

const mongoclient = mongo.MongoClient;

const url = "mongodb://127.0.0.1/";

const client = new mongoclient(url);


async function data(){
   try{
      await client.connect();
      console.log("Connect");
      const db = client.db("student");
      const colection = db.collection("info");
      
      let user = await  colection.find({}).toArray();
      
      console.log(user);
      let userdata2='';

      // insert data 
      
      app.get('/crud',(req,res)=>{
         res.render('index',{
          data:user,
          userdata2:userdata2
         })
       });
   
       app.post('/savedata',bs, async (req,res)=>{
            id = req.body.id;
            if(id != ''){
               user.forEach((i) =>{
                   if(i.id == id){
                       i.name = req.body.name;
                       i.email = req.body.email;
                       i.age = req.body.age;
                   }
               });
            }else{
               let data ={
                   id:user.length+1,
                   name:req.body.name,
                   email:req.body.email,
                   age:req.body.age
               }
               user.push(data);
               let result = await colection.insertOne(data);
               console.log(result);

               
            }
           userdata2 = '';
           res.render('index',{
               data:user,
               userdata2:userdata2
              });
       });
   
       app.get('/del/:id',(req,res)=>{
           let id= req.params.id;
           id = id-1;
           user.splice(id,1);
           let j =1 ;
           user.forEach((i) => {
                       i.id = j;
                       j++;
                   });
           res.redirect('/crud');
       });
   


       

   }catch(e){
      console.error(e);
   }
}

data();

app.get('/',(req,res)=>{
     console.log("hello..........");
});

app.listen(7171,"127.0.0.1",()=>{
   console.log("listen port 7171");
})