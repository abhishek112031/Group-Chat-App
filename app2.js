const express=require('express');
const bodyParser=require('body-parser');
const fs = require('fs');


const app=express();

app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{
    fs.readFile('message.txt',(err,data)=>{
        if(err){
            console.log(err);
            data="No chat available";
        }

        res.send(`${data}<form action="/" onsubmit="document.getElementById('username').value=localSorage.getItem('username')" method="POST">Enter message:<input type="text" name="message"><input type="hidden" id="username" name="username"><button type="submit">submit</button></form>`);
    })

    // console.log(req.body.username)

});
app.post('/',(req,res,next)=>{
    


    fs.writeFile('message.txt',`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{
        err?console.log(err):res.redirect('/');
    });
    console.log(req.body.username);
    console.log(req.body.message);

    
    
    // res.redirect('/');

})

app.get('/login',(req,res,next)=>{
    res.send('<form action="/" onsubmit="localStorage.setItem(`username`,document.getElementById(`username`).value)" method="POST">User Name:<input id="username" type="text" name="username"><button type="submit">submit</button></form>');
    // console.log(res.body);
    
});



// let data=[];




app.listen(3000);