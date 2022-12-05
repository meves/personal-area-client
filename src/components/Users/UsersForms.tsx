import React, { ChangeEvent, FormEvent, useState } from "react";
import { InputUserData, UserSearchData } from "./types";
import { useAppDispatch } from "../../app/hooks";
import { UserListThunk } from "../../store/usersSlice";
import styled from "styled-components";


const emptyInputs = { 
    firstname: "", 
    lastname: "" 

}
// --- << SearchUserForm >> ---
export const SearchUserForm = ({
    setUserSearchData 
} : {
    setUserSearchData: React.Dispatch<React.SetStateAction<UserSearchData>>
}) => {
    const [inputUserSearchData, setInputUserSearchData] = useState<UserSearchData>({ firstname: "", lastname: "" });    
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        setInputUserSearchData((prevUserSearchData) => ({ ...prevUserSearchData, [input.name]: input.value }));
    }
    
    const passUserSearchData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUserSearchData(inputUserSearchData);
        setInputUserSearchData(emptyInputs);
    }

    const resetUserSearchData = () => {
        setInputUserSearchData(emptyInputs);
        if (inputUserSearchData.firstname === "" && inputUserSearchData.lastname === "") {
            setUserSearchData(inputUserSearchData);
        }
    }

    return (
        <UsersFormStyled 
            onSubmit={passUserSearchData}
        >
            <input
                value={inputUserSearchData.firstname}
                onChange={handleChangeInput}
                type="text" 
                name="firstname" 
                placeholder="first name" />

            <input 
                value={inputUserSearchData.lastname}
                onChange={handleChangeInput}
                type="text" 
                name="lastname" 
                placeholder="last name" />

            <FormButton 
                type="submit">
            Search
            </FormButton>

            <FormButton
                className="right-btn"
                type="reset"
                onClick={resetUserSearchData}
            >Reset
            </FormButton>
        </UsersFormStyled>
    )
}

// --- << UserForm >> ---
export const UserForm = ({
    userData,
    setUserData
} : {
    userData: InputUserData
    setUserData: React.Dispatch<React.SetStateAction<InputUserData>>
}) => {    
    const dispatch = useAppDispatch();

    const handleSendOfForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userData.id !== null) {
            dispatch(UserListThunk.updateUserThunk(userData.id, userData.firstname, userData.lastname));
        } else {
            dispatch(UserListThunk.createUserThunk(userData.firstname, userData.lastname));
        }
        cancelUpdateSelectedUser();
    }

    const handleInputOfUserName = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        setUserData((prevUser) => ({ ...prevUser, [input.name]: input.value }));
    }    

    const cancelUpdateSelectedUser = () => {
        setUserData({ id: null, firstname: "", lastname: "" });
    }

    return (
        <UsersFormStyled 
            onSubmit={handleSendOfForm}
        >
            <input 
                value={userData.firstname}
                onChange={handleInputOfUserName}
                type="text" 
                name="firstname" 
                placeholder="first name" />

            <input 
                value={userData.lastname}
                onChange={handleInputOfUserName}
                type="text" 
                name="lastname" 
                placeholder="last name" />

            <FormButton
                type="submit"
            >Send
            </FormButton>

            { userData.id !== null &&
                <FormButton
                    className="right-btn"
                    onClick={cancelUpdateSelectedUser}
                >Cancel
                </FormButton>
            }
        </UsersFormStyled>
    )
}

// STYLES
const UsersFormStyled = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.55em 5em;
    border-radius: 0.3em;
    background-color: var(--form-bg-color);

    input {
        margin-right: 0.5em;
        padding: 0.3em 0.5em;
        outline: none;
        border: none;
    }
`;

export const FormButton = styled.button`
    padding: 0.3em 0.5em;
    border: none;
    color: var(--button-font-color);
    font-weight: 500;
    text-transform: uppercase;
    transition: transform 0.1s ease-in,
    font-weight 0.1s ease-in;

    &:hover {
        cursor: pointer;
        transform: scale(105%);
        font-weight: 900;
    }

    &.right-btn {
        margin-left: 0.5em;
    }
`;