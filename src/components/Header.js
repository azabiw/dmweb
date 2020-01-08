import React from "react";
import {Link} from "react-router-dom";

class Header extends React.Component {

    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Front page</Link>
                    </li>
                    <li>
                        <Link to="/editor">Editor</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        )

    }
}
export default Header;