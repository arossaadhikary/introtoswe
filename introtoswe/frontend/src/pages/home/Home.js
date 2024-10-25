import React from 'react'
import "./Home.css"

import homeImg from "../../assets/images/home_page_image.jpg";

function Home() {
  return (
    <div>

      <div className = "homeImgContainer">
        <img src = {homeImg} className = "homeImg"></img>
      </div>

    </div>
  )
}

export default Home