import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/Header.module.css";
import {Button} from "semantic-ui-react";
class Header extends React.Component {

    render() {
        return (

            <nav className={styles.header}>
                <ul>
                    <li className={styles.ListElement}>
                        <Button className={styles.LinkContainer} as={Link} to="/">Front Page</Button>
                    </li>
                    <li className={styles.ListElement}>
                        <Button className={styles.LinkContainer} as={Link} to="/editor">Editor</Button>
                    </li>
                    <li className={styles.ListElement}>
                        <Button className={styles.LinkContainer} as={Link} to="/about">About</Button>
                    </li>
                </ul>
            </nav>

        )

    }
}
export default Header;