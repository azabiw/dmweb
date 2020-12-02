import React from "react";
import {Link} from "react-router-dom";
//import styles from "../styles/Header.module.css";
import {Button,  Menu} from "semantic-ui-react";
import LoginContainer from "./Login";
import Helper from "./Helper";
class Header extends React.Component {

    render() {
        return (
            <Menu size="small" fluid inverted color={"purple"}>
                <Menu.Item>
                    <Button color={"purple"}  as={Link} to="/">DM Web</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button color={"purple"} as={Link} to="/editor">Editor</Button>
                    <Helper hint={"Only works while logged in."} />
                </Menu.Item>
                <Menu.Item>
                    <Button color={"purple"} as={Link} to="/hpc">HP Counter</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button color={"purple"} as={Link} to="/spellbook">Spell Book</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button color={"purple"} as={Link} to="/about">About</Button>
                </Menu.Item>
                <Menu.Item position="right">
                    <LoginContainer />
                </Menu.Item>
            </Menu>
        )
    }
}
export default Header;
