import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../app/hooks";
import { selectUser, UserFromToken } from "../../../store/authSlice";


export const UserEmail = () => {
    // select user that was created from token data
    const user: UserFromToken | null = useAppSelector(selectUser);

    return (
        <UserEmailStyled>
            {user?.email}
        </UserEmailStyled>
    )
}

const UserEmailStyled = styled.div`
    margin-left: 1em;
`;