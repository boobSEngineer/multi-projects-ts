import React from "react";
import w from "../Weather.module.css";
import {useAppSelector, useAppDispatch} from "../../../hook";
import {Day} from "./Day";

const ListDay: React.FC = () => {
    const allDayForecast = useAppSelector(state => state.weather.weatherForecast.allDayWithMaxTemForecast);


    return (
        <div  className={w.button}>
            {
                allDayForecast && allDayForecast.map(c => {
                    return <Day key={c.time.getTime()} {...c} />
                })

            }
        </div>
    )
}

export {ListDay};
