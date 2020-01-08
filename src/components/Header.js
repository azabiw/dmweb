import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/Header.module.css";
class Header extends React.Component {

    render() {
        //pakko määritellä näin, koska Link ei jostain syystä ymmärrä CSS -moduuleja
        const style = {
            "text-decoration": "none",
        "font-size": "1.5rem",
        display: "inline-block",
        margin: "1rem 0.5rem 1rem 0.5rem",
        padding: "1rem",
        color: "white",
        "border-radius" : "1rem",
        "background-color": "darkgray"
    };
        return (
            <nav className={styles.header}>
                <ul>
                    <li className={styles.ListElement}>
                        <Link style={style} to="/">Front page</Link>
                    </li>
                    <li className={styles.ListElement}>
                        <Link style={style} to="/editor">Editor</Link>
                    </li>
                    <li className={styles.ListElement}>
                        <Link style={style} classname={styles.LinkContainer} to="/about">About</Link>
                    </li>

                </ul>
            </nav>
        )

    }
}
export default Header;