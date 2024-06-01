import React from "react";
import './Homepage.css'
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate('/Champions')
    }
    return (
        <div>
            <h1 className="h11">find your new favorite</h1>
            <h1 className="h12">CHAMPION</h1>
            <p>filter by champ type and difficulty level to find the perfect match for your play style</p>
            <button onClick={handleButtonClick}>let's get started</button>
        </div>
    );
}