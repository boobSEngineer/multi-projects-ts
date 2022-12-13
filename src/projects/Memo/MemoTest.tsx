import React, {useState, useMemo, memo} from "react";
import FactorialCalculation from "./Factorial";
import Array from "./Array";
import m from "./MemoTest.module.css";

interface Primer {
    n :string
}

const LessOrMore = ({n} : Primer) => {
    const [r, setR] = useState<string>('');

    let solveR = (n: string): string => {
        if (r < n) {
            return 'R less N'
        }else  {
            return 'R more N'
        }
    }

    console.log('render LessOrMore')
    return (
        <div style={{borderBottom : '2px solid #f5f5f5', padding: '10px', width: '250px'}}>
            <div className={m.title}>
                <h2>{solveR(n)}</h2>
                <h3>R: {r}, N: {n}</h3>
            </div>
            <br/>
            <div>
                <span>Input p:</span>
                <input placeholder="input n" onChange={(e)=>{setR(e.target.value)}}/>
            </div>
        </div>

    )
};
const LessOrMoreMemo = memo(LessOrMore);

const MemoTest: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [n, setN] = useState<string>('');


    const arrayMemo = useMemo(() => ([1, 2, 3, 4, 5, 6]), []);
    const countSum = useMemo(()=>(sum(n)), [n]); //GOOD EXAMPLE USE MEMO
    console.log('render MEMO')

    return (
        <div className={m.wrapper} >
            <FactorialCalculation/>
            <LessOrMoreMemo n={n}/>
            <Array array={arrayMemo}/>
            <div className={m.click}>
                <h2>{number}</h2>
                <button onClick={() => {
                    setNumber(number + 1) //GOOD EXAMPLE USE MEMO
                }}>+</button>
            </div>


            <div className={m.plus}>
                <span>Input n: </span>
                <input placeholder="input n" onChange={(e)=>{setN(e.target.value)}}/>
                <span>SUM N + N:</span>
                <span>{countSum}</span>
            </div>
        </div>
    )
}
export {MemoTest};

function sum(n: string) {
    console.log(n)
    return n + n;
}
