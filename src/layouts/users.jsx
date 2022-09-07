import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserPage from "../components/page/userPage/userPage";
import UserEditPage from "../components/page/userEditPage/userEditPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        <>
            {userId ? (
                edit ? (
                    <UserEditPage userId={userId}/>
                ) : (
                    <UserPage userId={userId}/>
                )
            ) : (
                <UsersListPage/>
            )}
        </>
    );
};

export default Users;
