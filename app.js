const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const  nodeMailer = require('nodemailer');


const PORT = process.env.process || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const wishdata = require("./src/Model/userdata")

app.use(express.static(path.join(__dirname , '/Public'))); 
app.set('view engine','ejs');
app.set('views','./src/views/');

app.get("/" , (req,res)=>{
    res.render("index");
})

app.post("/post" , (req,res)=>{
    console.log(req.body);

    data = {
        username:req.body.yname,
        friendname:req.body.fname,
        email:req.body.email
    }
    console.log(data);

    var item = wishdata(data);
    item.save((err,result)=>{
        console.log(result)

        if (err){
            console.log(err)
        }
        else{
            res.render('greeting',{item});
        }
        console.log(item)
    }) 
})


app.get("/wish/:id" , (req,res)=>{
    var id = req.params.id;
    wishdata.findOne({_id: id})
  .then((user)=>{  
  res.render("wish",{user});
  })
 
});

app.get("/mailer/:id" , (req,res)=>{

    var id = req.params.id;
    wishdata.findOne({_id: id})
  .then((user)=>{ 

    console.log(user)

    let mailTransporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ebrahim000ebrahim@gmail.com',
            pass: 'qwertyuiop#$123'
        }
    });
      

    let mailDetails = {
        from: 'ebrahim000ebrahim@gmail.com',
        to: user.email,
        subject: 'Happy 2022 Wish from '+ user.username,
        text: 'You have received a Suprise gift from ' + user.username +' please click on the link to view it https://wishing-website2022.herokuapp.com/wish/'+user._id
    };
      
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
            res.send(Error)

        } else {
            console.log(mailDetails);
            console.log('Email sent successfully');
            res.send(Success)
        }
    });
    })
    });



app.listen(PORT , (req,res)=>{
    console.log(`Server Running on PORT ${PORT}`);
})
