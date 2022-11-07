import React, {useState, useMemo} from 'react';

const MAX_NUMBER = 20;

function FactorialCalculation() {
    const [currentNum, setCurrentNum] = useState<number>(MAX_NUMBER);
    const [error, setError] = useState('');

    console.log('render FACTORIAL')

    const factorialCurrentNum = currentNum <= MAX_NUMBER
        ? factorial(currentNum)
        : null;

    return (
        <section style={{border : '2px solid red', padding: '30px', width: '250px'}}>
            <label>Put your number:</label>
            <input
                type="number"
                value={currentNum}
                onChange={(e) => {
                    const newNum = Number(e.target.value);
                    if (newNum > MAX_NUMBER) {
                        setError('Sorry, I will die to calculate it...:P');
                    }
                    setCurrentNum(parseInt(e.target.value) === 0 ? parseInt(e.target.value) : newNum);
                }}
            />
            {error && <p>{error}</p>}
            <p>
                Factorial current number {currentNum} is:
                {` ${factorialCurrentNum || 'NOOOOOOO!!! I am dead! :D'}`}
            </p>
        </section>
    );
}


function factorial(n: number): number {
    console.log('ONO')
    if (n < 0) {
        return 69
    } else if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

export default React.memo(FactorialCalculation);
