import React from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AuthThunk, selectUser, UserFromToken } from "../../../store/authSlice";
import { Menu } from "../Menu";
import styles from "./index.module.scss";


/**
 * Navbar is displayed when the user is signedin
 */
export const Navbar = () => {   

    return (
        <nav className={styles.navbar}>
            <Menu/>
            <Logo/>
            <UserEmail/>
            <Logout/>
        </nav>
    )
}

/** -- Logo component -- **/
const Logo = () => {
    return (
        <div className={styles.logo}>
            <img src="/images/user-icon.svg" alt="user" />
        </div>
    )
}

/** -- UserEmail component -- */
const UserEmail = () => {
    // select user that was created from token data
    const user: UserFromToken | null = useAppSelector(selectUser);

    return (
        <div className={styles.email}>
            {user?.email}
        </div>
    )
}

/** -- Logout component -- */
const Logout = () => {

    const dispatch = useAppDispatch();

    // logout current user
    const handleLogout = () => {
        dispatch(AuthThunk.logout());
        <Navigate to="/" replace={true} />
    } 

    return (
        <div className={styles.logout} onClick={handleLogout}>
            logout
        </div>
    )
}