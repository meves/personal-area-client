import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GreetingThunk, selectGreetingResult, setGreetingResultAction } from "../store/greetingSlice";
import styled from "styled-components";


/**
* The Greeting component displays a button with the text "Load greeting".
* When a button is pressed, a request for a greeting text is sent to the server
* if the request is successful, the greeting text is displayed in <h1> and the button is disabled
* otherwise the error text is displayed and the button is also disabled
* Before unmounting, the ghreeting and error state is reset to null
 */
export const Greeting = () => {
    const dispatch = useAppDispatch();
    const greetingResult = useAppSelector(selectGreetingResult);
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);
    
    const getGreetingOnClick = useCallback(async () => {
        const firstRecordId = 1;
        const result = await dispatch(GreetingThunk.getGreetingThunk(firstRecordId));
        setButtonClicked(result as boolean);
    }, [dispatch])

    useEffect(() => {
        return () => {
            dispatch(setGreetingResultAction({message: null, error: null}));
        }
    }, [dispatch]);

    return (
        <GreetingComponent>
            <button className="submitButton"
                    onClick={getGreetingOnClick} 
                    disabled={buttonClicked}
            >{ buttonClicked ? "OK" : "Load greeting" }
            </button>

            { !!greetingResult.message && 
                <h1>{ greetingResult.message }</h1> 
            }

            { !!greetingResult.error && 
                <p role="alert">Oops, failed to fetch</p> 
            }
        </GreetingComponent>
    )
}

// STYLES
const GreetingComponent = styled.div`
    min-height: 76vh;
    padding: 2em 5em;
    background-color: var(--main-page-bg-color);
`;