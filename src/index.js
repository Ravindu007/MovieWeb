import Axios  from "axios"
import React, { useEffect, useState } from "react"
import {createRoot} from "react-dom/client"
import CreateNewForm from "./components/CreateNewForm"
import MovieCard from "./components/MovieCard"


function App(){

  //dummy data list 
  const [movies, setMovies] = useState([])

  useEffect(()=>{
    async function go(){
      const response = await Axios.get("/api/movies")
      setMovies(response.data)
    }
    go()
  }, [])

  return(
    <div className="container">
      <CreateNewForm setMovies={setMovies}/>
      <div className="card-group mt-5">
      {movies.map((movie)=>(
         <MovieCard  id={movie._id} Name={movie.Name} Genre={movie.Genre} setMovies={setMovies} key={movie._id}/>
      ))}
    </div>
    </div>
  )
}

const root = createRoot(document.querySelector("#app"))
root.render(<App/>)