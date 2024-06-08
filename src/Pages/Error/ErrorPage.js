import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './ErrorPage.css';

export default function ErrorPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { message, details, type } = location.state || { message: 'An unknown error occurred', details: 'No additional details available', type: 'unknown' };

    const getErrorMessage = () => {
        if (type === 'api') {
            return (
                <>
                    <h2>{message}</h2>
                    <p>{details}</p>
                </>
            );
        } else if (type === '404') {
            return (
                <>
                    <h2>Cannot find that page</h2>
                    <p>The URL you are trying to access does not exist or is malformed.</p>
                </>
            );
        } else {
            return (
                <>
                    <h2>{message}</h2>
                    <p>{details}</p>
                </>
            );
        }
    };

    return (
        <div className="error-page">
            {getErrorMessage()}
            <img src='./urf_emote.webp' alt='urf-the-manatee'/>
            <button className='home-button' onClick={() => navigate('/Champions')}>Back to All Champs</button>
        </div>
    );
}