import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";
import styles from "../styles/FrontPage.module.css"
class FrontPage extends React.Component {
    constructor(props) {
        super(props);
    }

   render() {
       return (
           <div className={styles.root}>
               <Header />
               <h1 className={styles.Title}>DM Web</h1>
           </div>

       )
   }

}
export default FrontPage;