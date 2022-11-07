import React, {useState, useMemo, memo} from "react";
import FactorialCalculation from "./Factorial";
import Lenka from "./Lenka";

interface Primer {
    n :string
}

const Sasha = ({n} : Primer) => {
    const [r, setR] = useState<string>('');
    let solveR = (n: string): number => {
        if (r < n) {
            return 69
        }else  {
            return 96
        }
    }

    console.log('render SASHA')
    return (
        <div style={{border : '2px solid blue', padding: '30px', width: '350px'}}>
            <h2>{solveR(n)}</h2>
            <h3>R: {r}, N: {n}</h3>
            <div>
                <span>INPUT R</span>
                <input placeholder="input n" onChange={(e)=>{setR(e.target.value)}}/>
            </div>
        </div>

    )
};
const SashaMemo = memo(Sasha);

const MemoTest: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [n, setN] = useState<string>('');


    const arrayMemo = useMemo(() => ([1, 2, 3, 4, 5, 6]), []);
    const countSum = useMemo(()=>(sum(n)), [n]); //GOOD EXAMPLE USE MEMO
    console.log('render MEMO')
    return (
        <div >
            <FactorialCalculation/>
            {/*<SashaMemo n={n}/>*/}
            <Lenka array={arrayMemo}/>
            <h2>{number}</h2>
            <button onClick={() => {
                setNumber(number + 1) //GOOD EXAMPLE USE MEMO
            }}>+
            </button>

            <div>
                <span>INPUT N</span>
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
