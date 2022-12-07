import React, { useState } from 'react'
import Axios from 'axios'
import "./MovieCard.scss"


function MovieCard(props){

  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState("")
  const [file, setFile] = useState()
  const [draftGenre, setDraftGenre] = useState("")

  //save data (form)
  async function submitHandler(e){
    e.preventDefault()
    setIsEditing(false)
    props.setMovies(prev => 
      prev.map(function (movie){
        if(movie._id == props.id){
          return {...movie, Name:draftName, Genre: draftGenre}
        }
        return movie
      })
    )
    //new file
    const data = new FormData()
    if(file){
      data.append("photo", file)
    }
    data.append("_id",props.id)
    data.append("Name", props.Name)
    data.append("Genre", props.Genre)

    const newPhoto = await Axios.post("/update-movie", data, {headers:{"Content-type":"multipart/form-data"}})
    if(newPhoto.data){
      props.setMovies(prev=>{
        return prev.map(function (movie){
          if(movie._id == props.id){
            return {...movie, photo:newPhoto.data}
          }
          return movie
        })
      })
    }  

  }

  return (
    <>
      <div className="card">
        <div className="card-top">
          {isEditing && (
            <input 
              onChange={e=>setFile(e.target.files[0])}
              type="file"
              className = "form-control"
            />
          )}
          {/* default photo */}
          <img src={props.photo ? `/uploaded-photos/${props.photo}`:"/fallback-png"} className="card-img" alt="" />
        </div>


        <div className="card-body">
            {isEditing && ( //editting mode
              <form onSubmit={submitHandler}>
                <div className="mb-1">
                  <input type="text" autoFocus onChange={e => setDraftName(e.target.value)} className="form-control" value={draftName}/>
                </div>
                <div className="mb-1">
                  <input type="text" autoFocus onChange={e => setDraftGenre(e.target.value)} className="form-control" value={draftGenre}/>
                </div>
                <button className='btn btn-success'>Save</button>{" "}
                <button onClick={()=> setIsEditing(false)} className="btn btn-outline-secondary">Cancel</button>
              </form>
            )}
            {!isEditing &&( //view mode
              <>
                <h4>{props.Name}</h4>
                <p>{props.Genre}</p>
                {!props.readOnly && (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setDraftName(props.Name)
                        setDraftGenre(props.Genre)
                        setFile("")
                      }}
                      className="btn btn-secondary"
                    >
                      Edit
                    </button> {" "}
                  </>
                )}
              </>
            )}
        </div>
      </div>
    </>
  )
}

export default MovieCard