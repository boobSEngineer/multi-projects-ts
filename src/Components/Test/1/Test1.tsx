import React from "react";
import t from "./Test1.module.css";
import icon from "../../../Utilities/Icons/icon_img.png";

let Test1: React.FC = () => {
    return (
        <div className={t.wrapper}>
            <div className={t.grid}>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
                <div className={t.grid_item}>
                    <img src={icon}/>
                </div>
            </div>
        </div>
    )
}

export {Test1};
