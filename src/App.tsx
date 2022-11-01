import React from "react";
import {InputAlbum} from "./Components/Gallery/InputAlbum";
import {Route, Routes} from "react-router-dom";
import {Gallery} from "./Components/Gallery/Gallery";
import {Weather} from "./Components/Weather/Weather";
import {Test1} from "./Components/Test/AdaptiveGrid/Test1";
import {GridEffect} from "./Components/GridEffect/GridEffect";
import {Test} from "./Components/Test/Polimorfism/Test";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Test/>}/>
            {/*<Route path="/" element={ <Test1/>}/>*/}
            {/*<Route path="/" element={<Gallery/>}/>*/}
            {/*<Route path="/albums/:idAlbum/photos" element={<InputAlbum/>}/>*/}
        </Routes>
    )
};

export {App};
