import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import styles from "../styles/FrontPage.module.css"
import {Container} from "semantic-ui-react";
class FrontPage extends React.Component {
    constructor(props) {
        super(props);
    }

   render() {
       return (
           <Container>
               <h1 className={styles.Title}>DM Web</h1>
           </Container>

       )
   }

}
export default FrontPage;