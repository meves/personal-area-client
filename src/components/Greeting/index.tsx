import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GreetingThunk, selectError, selectGreeting, setError, setGreeting } from "../../store/greetingSlice";
import styles from "./index.module.scss";

/**
* The Greeting component displays a button with the text "Load greeting".
* When a button is pressed, a request for a greeting text is sent to the server
* if the request is successful, the greeting text is displayed in <H1> and the button is disabled
* otherwise the error text is displayed and the button is also disabled
* Before unmounting, the ghreeting and error state is reset to null
 */
export const Greeting = () => {
    // check if the button is clicked
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    const buttonText = buttonClicked ? "OK" : "Load greeting";

    // get greeting and error state from redux store
    const greeting = useAppSelector(selectGreeting);
    const error = useAppSelector(selectError);

    // define dispatch useong hook
    const dispatch = useAppDispatch();

    const getGreetingOnClick = async () => {
        // get existing in a single copy greeting by id = 1
        const result = await dispatch(GreetingThunk.getGreetingThunk(1));
        await setButtonClicked(result as boolean);
    }

    useEffect(() => {
        // reset greeting state before unmounting component
        return () => {
            dispatch(setGreeting(null));
            dispatch(setError(null));
        }
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <button className="submitButton" 
                    onClick={getGreetingOnClick} 
                    disabled={buttonClicked}
            >
                { buttonText }
            </button>
            {greeting && 
                <h1>{ greeting }</h1>
            }
            {error && 
                <p role="alert">Oops, failed to fetch</p>
            }
        </div>
    )
}