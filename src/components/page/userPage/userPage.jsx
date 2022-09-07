import React, { useEffect, useState } from "react";
import { Link, Route, useHistory } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import UserEditPage from "../userEditPage/userEditPage";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push("/users");
    };
    if (user) {
        return (
            <div className='m-2'>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities}/>
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button onClick={handleClick}> Все Пользователи</button>
                <button>
                    <Link
                        className='text-decoration-none text-black'
                        to={`/users/${userId}/edit`}>
                        Изменить
                    </Link>
                </button>
                <Route path={`/users/${userId}/edit`} component={() => <UserEditPage userId={userId}/>}/>
            </div>
        );
    } else {
        return (<h3 className='m-2'>Loading...</h3>);
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
