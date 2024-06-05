import React from "react"
import { useNavigate } from "react-router-dom"

export default function ErrorPage(){
    const navigate = useNavigate()

   return (
    <div className="error-page">
        <h2>Cannot find that page</h2>
        <img src='./urf_emote.webp' alt='urf-the-manatee'/>
        <button className='home-button' onClick={() => navigate('/Champions')}>Back to All Champs</button>
    </div>
   ) 
}