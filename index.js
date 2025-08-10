const express = require("express")
const app = express()
const path = require("path")
const {v4: uuidv4} = require("uuid")
const methodOverride = require("method-override")
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
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
app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params
    let newContent = req.body.content
    let post = posts.find((p)=> p.id === id)
    post.content = newContent
    res.send("Post Updated!")
    
})
app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params
    let post = posts.find((p)=> p.id === id)
    res.render("edit.ejs", {post})
    
})
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params
    posts = posts.filter((p)=> p.id !== id)
    res.send("Delete Post!")
    res.redirect("/posts")
})

app.get("/", (req,res)=>{
    res.send(`Server running at ${port}`)
})
app.listen(port, ()=>{
    console.log("Server start");
})