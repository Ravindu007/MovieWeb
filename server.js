const express = require("express")
const {MongoClient} = require("mongodb")


const app = express()

//setting template engine
app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.static("public"))

//create database variable
let db

//create database connection 
async function start_connection(){
  const client = new MongoClient("mongodb+srv://ravindu0504:Rs19980504@movies.xadynp2.mongodb.net/Movies?retryWrites=true&w=majority")
  await client.connect()
  db = client.db()
  app.listen(3000)
}

start_connection()



//client route
app.get("/api/movies", async(req, res) => {
  const allMovies = await db.collection("movieList").find().toArray()
  res.json(allMovies)
})

//admin route
app.get("/admin", (req, res) => {
  res.render("admin")
})

