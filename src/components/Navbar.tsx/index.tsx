import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectUser, UserFromToken } from "../../store/authSlice";
import styles from "./index.module.scss";


export const Navbar = () => {
    // select user that was created from token data
    const user: UserFromToken | null = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    // logout current user
    const handleLogout = () => {
        dispatch(logout());
    }   

    return (
        // displays the user's image, email address, and an element to log the user out of the system
        <nav className={styles.navbar}>
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