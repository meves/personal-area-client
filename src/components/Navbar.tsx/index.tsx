import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectUser } from "../../store/authSlice";
import styles from "./index.module.scss";

export const Navbar = () => {

    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }   

    return (
        <nav className={styles.navbar}>
            <div 
                className={styles.logo}>
                <img src="/images/user-icon.svg" alt="user" />
            </div>
            <div 
                className={styles.email}>
                {user?.email}
            </div>
            <div 
                className={styles.logout} 
                onClick={handleLogout}>
                logout
            </div>
        </nav>
    )
}