import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";


export const Menu = () => {
    return (
        <ul className={styles.linkList}>
            <li className={styles.listItem}>
                <NavLink to="/">Home</NavLink>
            </li>
            <li className={styles.listItem}>
                <NavLink to="/users">Users</NavLink>
            </li>
            <li className={styles.listItem}>
                <NavLink to="/greeting">Greeting</NavLink>
            </li>
        </ul>
    )
}