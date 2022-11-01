import React from "react";
import {Route, Routes} from "react-router-dom";
import {TestFormWithoutRender} from "./Components/Test/FormWithoutRender/TestFormWithoutRender";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<TestFormWithoutRender/>}/>
            {/*<Route path="/" element={ <Test1/>}/>*/}
            {/*<Route path="/" element={<Gallery/>}/>*/}
            {/*<Route path="/albums/:idAlbum/photos" element={<InputAlbum/>}/>*/}
        </Routes>
    )
};

export {App};
