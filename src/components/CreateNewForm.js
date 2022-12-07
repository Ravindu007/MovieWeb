import Axios from 'axios';
import React, { useRef, useState } from 'react'

const CreateNewForm = (props) => {

  //input fields
  const [name,setName] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [file,setFile] = useState("")
  const CreatePhotoField = useRef()

  //submit handler
  async function submitHandler(e){
    e.preventDefault()

    //new dataset
    const data = new FormData()

    data.append("photo", file)
    data.append("name", name)
    data.append("year", year)

    //clear input fields
    setName("")
    setGenre("")
    setYear("")

    const newPhoto = await Axios.post("/create-movie", data, {headers: {"Content-type":"multipart/form-data"}})

    props.setMovie(prev => prev.concat([newPhoto]))
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-2">
        <input type="file" ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} className="form-control"/>
      </div>
      <div className="mb-2">
        <input type="text"  onChange={e => setName(e.target.value)} value={name} className="form-control"/>
      </div>
      <div className="mb-2">
        <input type="text"  onChange={e => setGenre(e.target.value)} value={genre} className="form-control"/>
      </div>
      <button className='btn btn-primary'>Create</button>
    </form>
  )
}

export default CreateNewForm