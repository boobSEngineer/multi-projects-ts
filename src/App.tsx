import React from "react";
import {Route, Routes} from "react-router-dom";
import {TestFormWithoutRender} from "./Components/Test/FormWithoutRender/TestFormWithoutRender";
import {MemoTest} from "./Components/Test/Memo/MemoTest";


const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MemoTest/>}/>
            {/*<Route path="/" element={ <Test1/>}/>*/}
            {/*<Route path="/" element={<Gallery/>}/>*/}
            {/*<Route path="/albums/:idAlbum/photos" element={<InputAlbum/>}/>*/}
        </Routes>
    )
};

export {App};
