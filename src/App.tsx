import React from "react";
import {Route, Routes} from "react-router-dom";

import {Layout} from "./Layout";
import {Home} from "./components/Home";
import {TestFormWithoutRender} from "./projects/FormWithoutRender/TestFormWithoutRender";
import {MemoTest} from "./projects/Memo/MemoTest";
import {Gallery} from "./projects/Gallery/Gallery";
import {InputAlbum} from "./projects/Gallery/InputAlbum";
import {Posts} from "./projects/Posts/Posts";
import {Test1} from "./projects/AdaptiveGrid/Test1";
import {Test} from "./projects/Polymorphism/Test";



const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>
                <Route path="form" element={<TestFormWithoutRender/>}/>
                <Route path="memo" element={<MemoTest/>}/>
                <Route path="polymorphism"  element={<Test/>}/>
                <Route path="posts"  element={<Posts/>}/>
                <Route path="gallery"  element={<Gallery/>}/>
                <Route path="gallery/:idAlbum/photos" element={<InputAlbum/>}/>
                <Route path="grid"  element={<Test1/>}/>
            </Route>

        </Routes>
    )
};

export {App};
