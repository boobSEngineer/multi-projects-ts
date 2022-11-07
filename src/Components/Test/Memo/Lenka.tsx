import React, {memo} from "react";

interface ArrayNumber {
    array: number[]
}

const Lenka = ({array}: ArrayNumber) => {
    console.log("render LENka")
    return (
        <div style={{border: '2px solid green', padding: '30px', width: '250px'}}>
            <div>{array.map(c => <div key={c}>{c}</div>)}</div>
        </div>

    )
};
export default React.memo(Lenka);
