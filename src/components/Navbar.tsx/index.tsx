import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthThunk, selectUser, UserFromToken } from "../../store/authSlice";
import styles from "./index.module.scss";


export const Navbar = () => {
    // select user that was created from token data
    const user: UserFromToken | null = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    // logout current user
    const handleLogout = () => {
        dispatch(AuthThunk.logout());
    }   

    return (
        // displays the user's image, email address, and an element to log the user out of the system
        <nav className={styles.navbar}>
            <ul className={styles.linkList}>
                <li className={styles.listItem}>
                    <NavLink to="/">Users</NavLink>
                </li>
                <li className={styles.listItem}>
                    <NavLink to="/greeting">Greeting</NavLink>
                </li>
            </ul>
            <div className={styles.logo}>
                <img src="/images/user-icon.svg" alt="user" />
            </div>
            <div className={styles.email}>
                {user?.email}
            </div>
            <div className={styles.logout} onClick={handleLogout}>
                logout
            </div>
        </nav>
    )
}