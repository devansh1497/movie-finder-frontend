import React from 'react';
import './index.css';
import LoadingOverlay from "react-loading-overlay";
import './App.css';
export const Header = () => {
    return (
        // <LoadingOverlay active={true} spinner text="loading">
        <div  id="header" style={{marginBottom: '50px', display: 'block'}}>
        <header  style={{background: 'rgba(19,51,76,1)', textAlign: "center", color:'rgba(47,130,120,1)', height: '150px', fontSize: '50px', top: '0'}}>
            <h1 id="title" style={{textAlign: "center", fontFamily: 'fantasy', width: '95%',lineHeight: '2', fontSize: '150%'}}>Movie Finder</h1>
        </header>
        </div>
        // </LoadingOverlay>
    )
}