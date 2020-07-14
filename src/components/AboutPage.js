import React from "react";
import {Container} from "semantic-ui-react";
/**
 * Sisältää lisätietojasivun sisällön.
 */
class AboutPage extends React.Component {
    render() {
        return (
            <Container text>
                <h1>About</h1>
                <p>This is a work-in-progress project to make a simple web program to help tabletop RPG game masters. Currently it's not ready for use. </p>
                Made by Ossi Vanhala. <a href="https://github.com/azabiw/dmweb" >Project on GitHub</a>
            </Container>
        )
    }
} export default AboutPage;