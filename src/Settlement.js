import React from "react";
//import Field from "./Field";
import Button from "@material-ui/core/Button";
import "./utilities";
import utilities from "./utilities";
import { Form, Field } from "react-final-form";
class Settlement extends React.Component {
    #id = 0;
    name = "New Settlement";
    leader;
    characters = [];
    render() {
        return (
            <Form onSubmit={(formData) => {
                console.log(formData);
            } }>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="name">
                            {props => (
                                <div>
                                    <label>Name</label>
                                    <input {...props.input} />
                                </div>
                            )}
                        </Field>
                        <Field name="leader">
                            {props => (
                                <div>
                                    <label>Leader</label>
                                    <input {...props.input} />
                                </div>
                            )}
                        </Field>
                        <Field name="location">
                            {props => (
                                <div>
                                    <label>Location</label>
                                    <input {...props.input} />
                                </div>
                            )}
                        </Field>

                        <Field name="features">
                            {props => (
                                <div>
                                    <label>Notable features</label>
                                    <input {...props.input} />
                                </div>
                            )}
                        </Field>

                        <Field name="population">
                            {props => (
                                <div>
                                    <label>Population and population structure</label>
                                    <input {...props.input} />
                                </div>
                            )}
                        </Field>

                        <Field name="security">
                            {props => (
                                <div>
                                    <label>Level of security</label>
                                    <input {...props.input} />
                                </div>
                            )}
                        </Field>

                        <Field name="organisations">
                            {props => (
                                <div>
                                    <label>Organisations</label>
                                    <input {...props.input} />
                                </div>
                            )}
                        </Field>

                        <Field name="interesting">
                            {props => (
                                <div>
                                    <label>Interesting locations</label>
                                    <input {...props.input} />
                                </div>
                            )}
                        </Field>

                        <button type="submit">Save</button>
                    </form>
                )}
            </Form>
        )
    }

}

export default Settlement;
