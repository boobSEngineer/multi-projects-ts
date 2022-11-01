import React from "react";
import PText from "./PText";
import PButton from "./PButton";

const Test: React.FC = () => {
    return (
        <div>
            <PText as="h1">Hello world!!!!</PText>
            <PText as="label" htmlFor="id" >To day we have list top of 10 cats</PText>
            <PText>CAT ONE</PText>

            <PButton as='a' href='#'>Click me!</PButton>
            <PButton>Clive me to!</PButton>
        </div>
)};

export {Test};
