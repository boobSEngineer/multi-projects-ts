import React from "react";
import l from "./LoginForm.module.css";
import {FormPropsTypes} from "./types";


type FormFields = {
    login: HTMLInputElement,
    password: HTMLInputElement,
    checkbox: HTMLInputElement,
}

interface LoginFormProps {
    func: (data: FormPropsTypes) => void;
}

export default ({func}: LoginFormProps) => {

    let handleSubmit: React.FormEventHandler<HTMLFormElement  & FormFields> = (event ) => {
        event.preventDefault();
        const form = event.currentTarget;
        const {login, password, checkbox} = form;
        func({
            login: login.value,
            password: password.value,
            checkbox: checkbox.value,
        })
    }

    return (
        <div className={l.wrapper}>
            <form className={l.form_box} onSubmit={handleSubmit}>
                <h2 className={l.title}>LOGIN FORM</h2>
                <label className={l.item_box}>
                    <input name="login" placeholder="login" required/>
                </label>
                <label className={l.item_box}>
                    <input name="password" placeholder="password" required/>
                </label>
                <label className={l.item_box}>
                    <input name="checkbox" type="checkbox" required/>
                    <span>check</span>
                </label>
                <label className={l.item_box}>
                    <button type="submit">Submit</button>
                </label>
            </form>
        </div>
    )
}

