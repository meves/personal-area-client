import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUsers, selectUsers } from '../../store/usersSlice';
import styles from './index.module.scss';

export const UserList = () => {
    
    const users = useAppSelector(selectUsers);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [])
    
    
    return (
        <div className={styles.usersContainer}>
            Add user
            <form>
                <input type="text" name="firstname" />
                <input type="text" name="lastname" />
            </form>
            User List
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <span>{user.firstname}</span> <span>{user.lastname}</span>
                    </li>
                ))}

            </ul>

        </div>
    )
}