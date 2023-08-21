
const model = require('../models/m');
const fs = require('fs');
let userdata2 = '';
let imgname = '';






//
const data = async (req, res) => {

    let user = await model.find();
   

    console.log(user);
        res.render('index', {
        data: user,
        userdata2: userdata2
    });
    
}



const deldata = async (req, res) => {

     user = await model.findOne({_id: req.params.id});
     let img = "uploads/" + user.pimage;

    fs.unlink(img, () => {
        console.log("delete");
    });

    await model.findByIdAndDelete({_id: req.params.id});
    res.redirect('/crud');
}

const aditdata = async (req, res) => {
    console.log("Working edit data");
    let id = req.params.id;
    console.log(id);
    user = await model.find();
    userdata2 = await model.find({_id: req.params.id});

    res.render('index', {
        data: user,
        userdata2:userdata2 
    });

    
};


module.exports = {
    data, deldata, aditdata
}