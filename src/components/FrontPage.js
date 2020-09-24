import React from "react";
import {Container, Header} from "semantic-ui-react";
class FrontPage extends React.Component {

   render() {
       return (
           <Container text>
                <Header as={"h1"} >DM Web</Header>
                <h3>To start using the program login and open the editor. </h3>
           </Container>

       )
   }

}
export default FrontPage;