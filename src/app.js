const express = require("express");
const app = express()
const hbs = require("hbs")
const path = require("path")
const port = process.env.PROT || 8000;

const staticPath = path.join(__dirname,"../public")
const templaPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

app.use(express.static(staticPath))
app.set("view engine","hbs")
app.set("views",templaPath)
hbs.registerPartials(partialPath)


app.get("/" ,(req,res) => {
    res.render("index")
})
app.get("/about" ,(req,res) => {
    res.render("about")
})


app.get("/weather" ,(req,res) => {
    res.render("weather")
})

app.get("*" ,(req,res) => {
    res.render("404error",{
        errorMsg:"Oops Page Not Found"
    })
})

app.listen(port,() => {
    console.log(`Listening to the Port no ${port}`)
})