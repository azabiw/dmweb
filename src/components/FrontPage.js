import React from "react";
import {Link} from "react-router-dom";
import Header from "./Header";

class FrontPage extends React.Component {
    constructor(props) {
        super(props);
    }

   render() {
       return (
           <div>
               <Header />
               <h1>Front page</h1>
           </div>

       )
   }

}
export default FrontPage;