import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GreetingThunk, selectGreetingResult, setGreetingResultAction } from "../../store/greetingSlice";
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

    const greetingResult = useAppSelector(selectGreetingResult);

    const dispatch = useAppDispatch();

    const getGreetingOnClick = async () => {
        // get existing in a single copy greeting by id = 1
        const result = await dispatch(GreetingThunk.getGreetingThunk(1));
        await setButtonClicked(result as boolean);
    }

    useEffect(() => {
        // reset greeting state before unmounting component
        return () => {
            dispatch(setGreetingResultAction({greeting: null, error: null}));
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
            {greetingResult.greeting && 
                <h1>{ greetingResult.greeting }</h1>
            }
            {greetingResult.error && 
                <p role="alert">Oops, failed to fetch</p>
            }
        </div>
    )
}