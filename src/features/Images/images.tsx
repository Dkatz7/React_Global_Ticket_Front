import React, { useEffect, useState } from 'react';
import { addImageAsync, getImagesAsync ,delImageAsync } from './imagesSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectIsAdmin } from '../Login/loginSlice';
import { selectImages } from "../Images/imagesSlice"
import { MY_SERVER } from '../../env';

export const ImagesComponent = () => {
  const dispatch = useAppDispatch();
  const images = useAppSelector(selectImages)
  const isAdmin = useAppSelector(selectIsAdmin)


  useEffect(() => {
    dispatch(getImagesAsync());
  }, [])

  const [image, setimage] = useState<File | null>(null)
  const [title, settitle] = useState("")
  const [alt_text, setalt_text] = useState("")



  return (
    <div>
      {isAdmin ? (
    <div>
      <div>
        <h1>Uploade new image</h1>
        <br></br>
        Title: <input onChange={(e) => settitle(e.target.value)}></input>
        Sub title: <input onChange={(e) => setalt_text(e.target.value)}></input>
        Sub title: <input type={"file"} onChange={(e) => e.target.files && setimage(e.target.files[0])}></input>
        <br></br>
        <button onClick={() => dispatch(addImageAsync({
          title,
          alt_text,
          image
        }))}>Uplode Image</button>
      </div>




      <h1>Images in my data: {images.length}</h1>
      <br></br>
      <h2>Images:</h2>
      {images.map((image, i) => (
        <div key={i} style={{ display: "flex", textAlign: 'left' }}>
          <br></br>
          Image ID = {image.id} <br></br>
          Image title: {image.title} <br></br>
          Image text: {image.alt_text} <br></br>
          IMage: <img src={MY_SERVER + image.image} sizes="" width="300" height="300"></img><br></br><br></br><br></br>
        <br></br>
        <button onClick={()=> dispatch(delImageAsync(image.id || -1))} >Delete Image</button>
        </div>
      ))}

      
    </div>):""}
    </div>
  )
}