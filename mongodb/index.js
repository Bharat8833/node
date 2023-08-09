

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
            
               let name = req.body.hid;
              let name1 = req.body.name
               // id = req.body.id;
       
               if(name != ''){
                  user.forEach( async (i) =>{
                      if(i.name == name){
                        let e = await colection.updateOne({name:name},{$set:{name1}});  
                        console.log(e);
            
                      }
                  });
                  
            }else{
               let data ={

                   name:req.body.name,
                   email:req.body.email,
                   age:req.body.age
               }
               user.push(data);
               let result = await colection.insertOne(data);
               console.log(result);

               
            }
         res.redirect('crud');
       });
   
       app.get('/del/:name', async (req,res)=>{
             let name = req.params.name;
           console.log(name);
          
         
           let d = await colection.deleteOne({name:name});
           res.render('index',{
            data:user,
            userdata2:userdata2
           })
          
       });
   

       app.get('/edit/:name', async (req,res)=>{
         let name = req.params.name;
     
        
         userdata2 = user.find((i)=>{
            return i.name==name;
         });
         console.log(userdata2);
         res.render('index',{
            data:user,
            userdata2:userdata2
         });
       
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