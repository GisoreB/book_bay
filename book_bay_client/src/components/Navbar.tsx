import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <h1 className="logo">tiny-library</h1>
            <ul>
                <li>
                    <Link to="/">Books</Link>
                </li>
                <li>
                    <Link to="/add-book">Add Book</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;