import { UserFromList } from "../../types";
import { UserSearchData } from "./types";


export const isUserShouldBeInList = (user: UserFromList, userSearch: UserSearchData) => {
    return (isSearchNameEmpty(userSearch.firstname) || 
            isUserNameContainsSearchName(user.firstname, userSearch.firstname)) 
        && 
            (isSearchNameEmpty(userSearch.lastname) || 
            isUserNameContainsSearchName(user.lastname, userSearch.lastname))
}

const isSearchNameEmpty = (searchName: string) => {
    return searchName === "";
}

const isUserNameContainsSearchName = (userName: string, searchName: string) => {
    return userName.toLowerCase().includes(searchName.toLowerCase());
}