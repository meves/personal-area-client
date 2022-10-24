import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { login, register } from '../../store/authSlice'
import styles from './index.module.scss'

export const LoginForm = ({
    registered
} : {
    registered: boolean | null
}) => {
    /**
     * if registered is null, then use local state
     * else local state depends on global state
     */
    const [localRegistered, setLocalRegistered] = useState(registered === null ? false : registered)
    
    const dispatch = useAppDispatch()
    /* send POST requests:
        if registered then POST login, 
        if not registered then POST register 
    */
    useEffect(() => {
        if (registered !== null) {
            registered ? 
            dispatch(login())
            : 
            dispatch(register())
        }
    }, [registered])

    return (
        <div className='centeredContainer flexDirectionColumn' >
            <form className={styles.loginForm}>
                <fieldset>
                    <legend>{localRegistered ? "Login" : "Register"} form</legend>
                    <p className={styles.inputField}>
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" />
                    </p>
                    <p className={styles.inputField}>
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" />
                    </p>
                    <p className={styles.buttonField}>
                        <input className="submitButton" type="submit" value="Send" />    
                    </p>
                </fieldset>
            </form>
            {registered === null && 
                <ToggleFormButton 
                    localRegistered={localRegistered} 
                    setLocalRegistered={setLocalRegistered}
                />
            }
        </div>
    )
}

const ToggleFormButton = ({
    localRegistered,
    setLocalRegistered
} : {
    localRegistered: boolean,
    setLocalRegistered: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <div className={styles.toggleForm}>
            <button
                className="toggleButton"
                onClick={() => {
                    setLocalRegistered((prev) => !prev)
                }}
            >
                { localRegistered ? "Register" : "Login"}
            </button>
        </div>        
    )
}