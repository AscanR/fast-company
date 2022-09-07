import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className={"nav justify-content-start m-2"}>
            <li className={"m-2"}><Link to='/'>Main</Link></li>
            <li className={"m-2"}><Link to='/login'>Login</Link></li>
            <li className={"m-2"}><Link to='/users'>Users</Link></li>
        </ul>
    );
};

export default NavBar;
