const express = require("express")
const app = express()
const path = require("path")
const {v4: uuidv4} = require("uuid")
const port = 3000;

app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

let posts =[
    {
        "id": uuidv4(),
        "username" : "Premm Sharma",
        "content" : "Target MAANG"
    },
    {
        "id": uuidv4(),
        "username" : "Atharv Sharma",
        "content" : "Target Fanng"
    },
    {
        "id": uuidv4(),
        "username" : "Dhivanshu Sharma",
        "content" : "Target Fanng"
    },
    {
        "id": uuidv4(),
        "username" : "Bala Arpit",
        "content" : "Target MAANG"
    },
    {
        "id": uuidv4(),
        "username" : "Jay",
        "content" : "Target MAANG"
    }
]

app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts})
})
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs")
})
app.post("/posts", (req,res)=>{
    let {username, content} = req.body
    let id = uuidv4()
    posts.push({id, username, content})
    res.redirect("/posts")
})

app.get("/posts/:id", (req,res)=>{
   let {id} = req.params
   let post = posts.find((p)=> p.id === id)
   res.render("show.ejs", {post})
   
})
app.get("/", (req,res)=>{
    res.send(`Server running at ${port}`)
})
app.listen(port, ()=>{
    console.log("Server start");
})