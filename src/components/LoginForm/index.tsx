import React, { ChangeEvent, FormEvent, MouseEvent, TouchEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectErrorMessage, signin, signup } from "../../store/authSlice";
import styles from "./index.module.scss";

export const LoginForm = () => {
    // if error occured while signing, not empty string
    const errorMessage = useAppSelector(selectErrorMessage);
    
    // used to switch register or login form 
    const [formType, setFormType] = useState<"signin" | "signup">("signup")
    
    // controlled inputs
    const [inputText, setInputText] = useState({ email: "", password: "" });
    const changeInputText = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setInputText((prevInputText) => ({...prevInputText, [name]: value}));
    }
    
    const dispatch = useAppDispatch();

    // process form submitting
    const submitForm = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { email, password } = inputText;
        switch (formType) {
            case "signup":
                dispatch(signup(email, password));
                break;
            case "signin":
                dispatch(signin(email, password));
                break;
        }
        setInputText({ email:"", password: ""});
    }

    const toggleRegistered = (event: TouchEvent | MouseEvent) => {
        event.preventDefault()
        setFormType((prev) => 
            prev === "signup" ? "signin" : "signup"
        )
    }

    return (
        <div className='centeredContainer flexDirectionColumn' >
            <form className={styles.loginForm} >
                <div className={styles.errorMessage}>{!!errorMessage && errorMessage}</div>
                <fieldset>
                    <legend>
                        {formType === "signin" ? "Login" : "Register"} form
                    </legend>
                    <p className={styles.inputField}>
                        <label htmlFor="email">email</label>
                        <input type="email" required name="email" value={inputText.email} onChange={changeInputText} />
                    </p>
                    <p className={styles.inputField}>
                        <label htmlFor="password">password</label>
                        <input type="password" required name="password" value={inputText.password} onChange={changeInputText} />
                    </p>
                    <p className={styles.buttonField}>
                        <input className="submitButton" type="submit" value={formType === "signin" ? "Login" : "Register"} 
                            onClick={submitForm}
                        />    
                    </p>
                </fieldset>
            </form>
            <div className={styles.toggleForm}>
                <p>{ formType === "signin" ? "If you have no account " : "If you have an account "}go to</p>
                <a href="/" className={styles.sign} onClick={toggleRegistered}>
                    { formType === "signin" ? "Register" : "Login"}
                </a>
            </div>            
        </div>
    )
}
