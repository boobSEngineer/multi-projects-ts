import React from "react";
import  LoginForm from "./LoginForm";
import {FormPropsTypes} from "./types";

const TestFormWithoutRender: React.FC = () => {

    let onSubmit = (formFields: FormPropsTypes) => {
        console.log(formFields);
    }

    return (
        <div>
            <LoginForm func={onSubmit}/>
        </div>
    )
}

export {TestFormWithoutRender}
