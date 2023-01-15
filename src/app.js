const express = require("express");
const fs = require("fs");
const path = require("path");
const hbs = require("hbs");

const app = express();
const port = 8000;

const publicPath = path.join(__dirname,"../public");
// console.log(publicPath);

const templatePath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");
hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs');
app.set('views', templatePath);

app.use(express.static(publicPath));
app.get("/",(req,res)=>{
    res.render('index');
});
app.get("/about",(req,res)=>{
    res.render('about');
});
app.get("/weather",(req,res)=>{
    res.render('weather');
});
app.get("*", (req,res)=>{
    res.render('404err',{
        errorMsg : 'Opps Page Not Found'
    });
});     


app.listen(port,()=>{
    console.log(`Listining on ${port}`);
});