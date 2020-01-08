import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/Header.module.css";
class Header extends React.Component {

    render() {
        return (
            <nav className={styles.header}>
                <ul>
                    <li className={styles.Link}>
                        <Link to="/">Front page</Link>
                    </li>
                    <li className={styles.Link}>
                        <Link to="/editor">Editor</Link>
                    </li>
                    <li className={styles.Link}>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
        )

    }
}
export default Header;