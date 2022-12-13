import React, {memo} from "react";
import a from "./MemoTest.module.css";

interface ArrayNumber {
    array: number[]
}

const Array = ({array}: ArrayNumber) => {
    console.log("render ARRAY")
    return (
        <div className={a.box}>
            <p>props array: </p><p>{array.map(c => <div key={c}>{c}</div>)}</p>
        </div>

    )
};
export default React.memo(Array);
