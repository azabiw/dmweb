import React from "react";
import styles from "../styles/FrontPage.module.css"
import {Container} from "semantic-ui-react";

/**
 * Projektin etusivu.
 */
class FrontPage extends React.Component {

   render() {
       return (
           <Container>
               <h1 className={styles.Title}>DM Web</h1>
               <h2>Currently not functional at all so please save yourself from trouble caused by trying to use this.</h2>
               <p>This is a Work-in-Progress build of a tool for tabletop gamemasters.</p>
           </Container>

       )
   }

}
export default FrontPage;