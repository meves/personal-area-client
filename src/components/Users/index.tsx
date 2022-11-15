import React, { ChangeEvent, FormEvent, MouseEvent, TouchEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserListThunk, selectUsers } from '../../store/usersSlice';
import styles from './index.module.scss';

type InputUserData = {
    id: number | null;
    firstname: string;
    lastname: string;
}

type UserSearchData = {
    firstname: string
    lastname: string
}

// Users ---------------------------------------------------------------------------------
export const Users = () => {
    
    /** state for controlled inputs in UserForm */
    const [userData, setUserData] = useState<InputUserData>({ id: null, firstname: "", lastname: "" });
    
    /** state for filtering users list */
    const [userSearchData, setUserSearchData] = useState<UserSearchData>({ firstname: "", lastname: "" });

    return (
        <div className={styles.usersContainer}>
            <h2>User List application</h2>
            <h4 
                className={styles.formTitle}
            >Search user by name
            </h4>
            <SearchUserForm 
                userSearchData={userSearchData} 
                setUserSearchData={setUserSearchData} 
            />
            <h4 
                className={styles.formTitle}
            >Add or update user
            </h4>
            <UserForm 
                userData={userData} 
                setUserData={setUserData} 
            />
            <h4 
                className={styles.formTitle}
            >User list
            </h4>
            <UserList 
                setUserData={setUserData} 
                userSearchData={userSearchData} 
            />
        </div>
    )
}

// SearchUserForm ---------------------------------------------------------------------------------
const SearchUserForm = ({
    userSearchData,
    setUserSearchData
} : {
    userSearchData: UserSearchData
    setUserSearchData: React.Dispatch<React.SetStateAction<UserSearchData>>
}) => {
    /** local state for controlled fields */
    const [inputUserSearchData, setInputUserSearchData] = useState<UserSearchData>({ firstname: "", lastname: "" });
    /** handler for controlled fields */
    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        setInputUserSearchData((prevUserSearchData) => ({ ...prevUserSearchData, [input.name]: input.value }));
    }
    /** pass user search data toLowerCase() parent component toLowerCase() filter them */
    const passUserSearchData = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUserSearchData(inputUserSearchData);
        setInputUserSearchData({ firstname: "", lastname: "" });
    }

    return (
        <form 
            className={styles.form} 
            onSubmit={passUserSearchData}
        >
            <input
                className={styles.input}
                value={inputUserSearchData.firstname}
                onChange={handleChangeInput}
                type="text" 
                name="firstname" 
                placeholder="first name" 
            />
            <input 
                className={styles.input}
                value={inputUserSearchData.lastname}
                onChange={handleChangeInput}
                type="text" 
                name="lastname" 
                placeholder="last name" 
            />
            <button 
                className={styles.button}
                type="submit"
            >Search
            </button>
        </form>
    )
}

// UserForm ---------------------------------------------------------------------------------
const UserForm = ({
    userData,
    setUserData
} : {
    userData: InputUserData
    setUserData: React.Dispatch<React.SetStateAction<InputUserData>>
}) => {
    
    /** handler of user input */
    const handleInputOfUserName = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget;
        setUserData((prevUser) => ({ ...prevUser, [input.name]: input.value }));
    }

    const dispatch = useAppDispatch();
    
    /** handler of form sending */
    const handleSendOfForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (userData.id !== null) {
            dispatch(UserListThunk.updateUserThunk(userData.id, userData.firstname, userData.lastname));
        } else {
            dispatch(UserListThunk.createUserThunk(userData.firstname, userData.lastname));
        }
        cancelUpdateSelectedUser();
    }

    /** cancel updating user */
    const cancelUpdateSelectedUser = () => {
        setUserData({ id: null, firstname: "", lastname: "" });
    }

    return (
        <form 
            className={styles.form} 
            onSubmit={handleSendOfForm}
        >
            <input 
                className={styles.input}
                value={userData.firstname}
                onChange={handleInputOfUserName}
                type="text" 
                name="firstname" 
                placeholder="first name"
            />
            <input 
                className={styles.input}
                value={userData.lastname}
                onChange={handleInputOfUserName}
                type="text" 
                name="lastname" 
                placeholder="last name" 
            />
            <button
                className={styles.button}
                type="submit"
            >Send
            </button>
            {userData.id !== null &&
                <button
                    className={`${styles.cancel} ${styles.button}`}
                    onClick={cancelUpdateSelectedUser}
                >Cancel</button>
            }
        </form>
    )
}

// UserList ---------------------------------------------------------------------------------
const UserList = ({
    userSearchData,
    setUserData
} : {
    userSearchData: UserSearchData
    setUserData: React.Dispatch<React.SetStateAction<InputUserData>>
}) => {
    const users = useAppSelector(selectUsers);
    
    const dispatch = useAppDispatch();
    /** get all users when page loaded or users changed */
    useEffect(() => {
        dispatch(UserListThunk.getUsersThunk());
    }, [dispatch])
    // delete chosen user by id
    const handleDeleteUsers = (event: MouseEvent | TouchEvent, id: number) => {
        dispatch(UserListThunk.deleteUserThunk(id));
    }
    /** send user data toLowerCase() Users toLowerCase() local state */
    const sendUserDataToLocalState = (id: number, firstname: string, lastname: string) => {
        setUserData({id, firstname, lastname});
    }

    return (
        <ul className={`flexDirectionColumn ${styles.list}`}>
            {users
            .filter(user => {                
                return (userSearchData.firstname === "" || 
                    user.firstname.toLowerCase().includes(userSearchData.firstname.toLowerCase())
                ) &&
                (userSearchData.lastname === "" || 
                    user.lastname.toLowerCase().includes(userSearchData.lastname.toLowerCase())
                )             
            })
            .map((user) => (
                <li 
                    className={styles.item}
                    key={user.id}
                >
                    <span
                        className={styles.name}    
                    >{user.firstname}
                    </span> 
                    <span
                        className={styles.name}
                    >{user.lastname}
                    </span>
                    <button
                        className={styles.button}
                        onClick={() => sendUserDataToLocalState(user.id, user.firstname, user.lastname)}
                    >edit</button>
                    <button
                        className={styles.button}
                        onClick={(event) => handleDeleteUsers(event, user.id)}
                    >delete</button>
                </li>
            ))}
        </ul>
    )
}