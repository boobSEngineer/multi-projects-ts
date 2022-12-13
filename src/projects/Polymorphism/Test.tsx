import React from "react";
import PText from "./PText";
import PButton from "./PButton";
import t from "./Test.module.css";

const Test: React.FC = () => {
    return (
        <div className={t.wrapper}>
            <div className={t.box}>
                <PText as="h1" style={{color : '#444343', fontSize: '45px', margin: '0'}}>Hello world!!!!</PText>
                <br/>
                <PText as="label" htmlFor="id" >To day we have a list top of 10 cats</PText>
                <PText>CAT ONE</PText>
                <PText>CAT TWO</PText>
                <br/>
                <PButton as='a' href='#'>Click me!</PButton>
                <br/>
                <br/>
                <PButton>Click me to!</PButton>
            </div>
        </div>

)};

export {Test};
