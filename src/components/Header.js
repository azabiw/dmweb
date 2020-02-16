import React from "react";
import {Link} from "react-router-dom";
import styles from "../styles/Header.module.css";
import {Button, Container, Menu} from "semantic-ui-react";
class Header extends React.Component {

    render() {
        return (
            <Menu inverted color={"purple"}>
                <Menu.Item>
                    <Button  as={Link} to="/">DM Web</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button  as={Link} to="/npceditor">NPC Editor</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button  as={Link} to="/settlementeditor">Settlement Editor</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as={Link} to="/QuestEditor">Quest Editor</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as={Link} to="/hpc">HP Counter</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as={Link} to="/logbook">Log Book</Button>
                </Menu.Item>
                <Menu.Item>
                    <Button as={Link} to="/about">About</Button>
                </Menu.Item>
            </Menu>
        )
    }
}
export default Header;
