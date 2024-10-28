const express = require("express");
const app = express();
const expressSession = require("express-session");
const fs =require('fs');
const path = require("path");

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"khaataBook"
}));
app.get("/edit/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        if(err) return res.send("error");
        else res.render("edit",{data , filename:req.params.filename});
    });
})
app.get("/open/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        if(err) return res.send("error");
        else res.render("openhissab",{data , filename:req.params.filename});
    });
})
app.post("/update/:filename",(req,res)=>{
    fs.writeFile(`./files/${req.params.filename}`,req.body.filedata,(err)=>{
        if(err) return res.send("err");
            else res.redirect("/");
    })
})
app.get("/usercreation",(req,res)=>{
    res.render("usercreation");
})
app.get("/contactus",(req,res)=>{
    res.render("contactus");
})
app.post("/createmanualy",(req,res)=>{
    fs.writeFile(`./files/${req.body.name}`,req.body.filedata,(err)=>{
        if(err) return res.send(err)
            else res.redirect("/");
    })
})
app.get('/',(req,res)=>{
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files})
    });
})
app.get("/delete/:filename",(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`,(err)=>{
        if(err) return res.send("error");
       else res.redirect("/");
    });
})
app.get('/create',(req,res)=>{
    const currentDate = new Date();

// Format date as dd-mm-yyyy
const day = String(currentDate.getDate()).padStart(2, '0');
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const year = currentDate.getFullYear();

let fn = `${day}-${month}-${year}.txt`;

fs.writeFile(`./files/${fn}`,"hello hissab",(err)=>{
    if(err) return res.send("errrr");
    else res.send(`YOUR hissab is created by the name ${fn}.txt`);
});

});




app.listen(process.env.PORT || 3000)
