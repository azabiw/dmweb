import React from "react";
import {Popup, Icon } from 'semantic-ui-react'
import v4 from "uuid";

/**
 * Infopallo. Näyttää hiirellä hoveratessa tarvittavaa tietoa lähellä olevista komponenteista. 
 * Ottaa propseina ohjeen.
 */
class Helper extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Popup key={v4()}
                circular
                content={this.props.hint ?? "Hint not set"}
                trigger={<Icon name="info" 
                    circular 
                    inverted
                    color="blue"/>}
                />

                
            </React.Fragment>
        )
    }
} 
export default Helper;