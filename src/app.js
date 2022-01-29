const express = require('express')
const app=express()
const path = require('path')
const bodyparser=require('body-parser')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const User = require('./db/mongoose')


const host=process.env.PORT||8000

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "vgjfjdfkyseeulmmcfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// cookie parser middleware
app.use(cookieParser());

// a variable to save a session
let session;
let CurrentUser;

app.use(express.static('public'));
app.set('view engine', 'hbs')

app.use(bodyparser.urlencoded({extended:false}))

app.get('/', (req,res)=>{
    session=req.session;
    if(session.userid){
        res.redirect('/scroll');
    }
    else{
        res.render('index')
    }
})

app.post('/signin', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        session=req.session;
        session.userid=req.body.email;
        CurrentUser = user
        res.send({'response': 'success'})
    } catch (e) {
        res.status(200).send({'response':'invalid Credentials'})
        spritle
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})



app.post('/signup', (req,res)=>{
    const user= new User(req.body)
    user.save().then((resp)=>{
        session=req.session;
        session.userid=req.body.email;
        CurrentUser =req.body
        console.log(CurrentUser,"::::::::::")
        res.send({"response":'success'})
    }).catch((err)=>{
        res.send({"response":'user already exist'})

    })
    
})

app.get('/scroll', (req,res)=>{
    session=req.session;
    if(session.userid){
        res.render('scroll',{firstname:CurrentUser.firstname,lastname:CurrentUser.lastname});
    }
    else{
        res.render('index')
    }
})

app.get('/all-user', (req, res)=>{
    User.find({}).then(function (users) {
        res.send(users);
        });
})

app.delete('/d-user', (req, res)=>{
    User.deleteOne({ _id: req.body.id},  (err, results) => {
        var sId = CurrentUser._id
        
        if (req.body.id === sId.toString().split('"')[0]){
            req.session.destroy();
            res.send({'response': 'success'});
        }
        else{
            res.send({'response': 'success'});
        }
    });
})


app.post('/p-user', (req, res)=>{
    console.log(req.body)
    User.update({'_id':req.body.id}, {$set:req.body}, function(err, result){
        res.send({'response': 'success'});

    })
})


app.listen(host,()=>{

    console.log('server listening on port'+host)
    
})
