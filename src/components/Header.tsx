import React from "react";
import h from "./Header.module.css";
import {Link} from "react-router-dom";


const Header: React.FC = () => {
    return (
        <header>
            <h2>Switch project</h2>
            <div className={h.switch}>
                <Link to="/">Home</Link>
                <Link to="/form">Form without render</Link>
                <Link to="/memo">Memo test</Link>
                <Link to="/polymorphism">Polymorphism</Link>
                <Link to="/posts">Posts with ts</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/grid">Posts with ts</Link>
            </div>
        </header>
    )
}

export {Header}
