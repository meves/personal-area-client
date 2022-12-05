import React, { useEffect } from "react";
import { InputUserData, UserSearchData } from "./types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUsers, UserListThunk } from "../../store/usersSlice";
import { FormButton } from "./UsersForms";
import { UserFromList } from "../../types";
import styled from "styled-components";
import { isUserShouldBeInList } from "./utils";


export const UserList = ({
    userSearchData, 
    setInputUserData
} : {
    userSearchData: UserSearchData
    setInputUserData: (inputUserData: InputUserData) => void
} ) => {
    const users = useAppSelector(selectUsers);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(UserListThunk.getUsersThunk());
    }, [dispatch])
    
    return (
        <>
            <UpdateButton/>            
            <UserListStyled>
                {users
                .filter((user: UserFromList) => isUserShouldBeInList(user, userSearchData)
                )
                .map((user) => (
                    <UserListItem 
                        key={user.id}
                        user={user}
                        setInputUserData={setInputUserData}
                    />
                ))}
            </UserListStyled>
        </>
    )
}
// styles
const UserListStyled = styled.ul`
        
    list-style-type: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 0;
    background-color: var(--list-bg-color);

    li {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.3em 1em;

    }
`;


const UpdateButton = () => {
    const dispatch = useAppDispatch();

    const updateUserListOnClick = () => {
        dispatch(UserListThunk.getUsersThunk());
    }

    return (
        <UpdateButtonStyled
            onClick={updateUserListOnClick}
        >Update users
        </UpdateButtonStyled>
    )
}
// styles
const UpdateButtonStyled = styled(FormButton)`
    margin-left: 0.5em;
    border: 2px solid violet;
    color: #450845;

    &:hover {
        cursor: pointer;
    }
`;


const UserListItem = ({
    user,
    setInputUserData
} : {
    user: UserFromList
    setInputUserData: (user: InputUserData) => void
}) => {
    const dispatch = useAppDispatch();

    return (
        <li>
            <Name>{user.firstname}</Name> 
            <Name>{user.lastname}</Name>
            
            <FormButton
                onClick={() => setInputUserData({
                    id: user.id, 
                    firstname: user.firstname, 
                    lastname: user.lastname
                })}
            >edit
            </FormButton>                        
            <FormButton
                className="right-btn"
                onClick={() => dispatch(UserListThunk.deleteUserThunk(user.id))}
            >delete                        
            </FormButton>
        </li>
    )
}
// styles
const Name = styled.span`
    width: 15%;
    text-align: start;
`;