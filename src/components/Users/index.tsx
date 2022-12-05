import React, { useState } from 'react';
import { SearchUserForm, UserForm } from './UsersForms';
import { InputUserData, UserSearchData } from './types';
import { UserList } from './UserList';
import styled from 'styled-components';


const initialInputUserData: InputUserData = {
    id: null,
    firstname: "",
    lastname: ""
}

const initialUserSearchData: UserSearchData = {
    firstname: "",
    lastname: ""
}

export const Users = () => {
    const [inputUserData, setInputUserData] = useState(initialInputUserData);
    const [userSearchData, setUserSearchData] = useState(initialUserSearchData);
    
    return (
        <UsersStyled>
            <h2>User List application</h2>
            
            <Heading4>Search user by name</Heading4>
            <SearchUserForm 
                setUserSearchData={setUserSearchData} 
            />
            
            <Heading4>Add or update user</Heading4>
            <UserForm 
                userData={inputUserData} 
                setUserData={setInputUserData} 
            />

            <Heading4>User list</Heading4>            
            <UserList
                userSearchData={userSearchData} 
                setInputUserData={setInputUserData}
            />
        </UsersStyled>
    )
}


// styles
const UsersStyled = styled.div`
    padding: 1em;
`;

const Heading4 = styled.h4`
    margin-top: 2em;
    margin-bottom: 0.5em;

`;