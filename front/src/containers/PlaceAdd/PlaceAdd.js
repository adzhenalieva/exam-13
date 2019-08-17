import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Form, FormGroup, Col, Button, Alert} from "reactstrap";


import FormElement from "../../components/UI/Form/FormElement";
import {sendPlace} from "../../store/actions/placeActions";
import {NotificationManager} from "react-notifications";

import "./PlaceAdd.css";

class PlaceAdd extends Component {

    state = {
        title: '',
        mainImage: '',
        description: '',
        agreement: false
    };

    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/login');
        }
    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    setAgreement = () => {
        this.setState({agreement: !this.state.agreement});
    };

    submitFormHandler = event => {
        event.preventDefault();
        if(this.state.agreement){
            const formData = new FormData();
            Object.keys(this.state).forEach(key => {
                formData.append(key, this.state[key]);
            });
            this.props.sendPlace(formData);
        } else{
            NotificationManager.error('You should agree the rules in order to publish content')
        }

    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })

    };

    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <Fragment>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        Check the internet connection
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <h2>Add new place</h2>
                    <FormElement
                        propertyName="title"
                        title="Title"
                        type="text"
                        value={this.state.title}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('title')}
                        placeholder="Enter title of the recipe"
                        required
                    />
                    <FormElement
                        propertyName="description"
                        title="Description"
                        type="text"
                        value={this.state.description}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('description')}
                        placeholder="Enter description of the recipe"
                        required
                    />
                    <FormElement
                        propertyName="mainImage"
                        title="Image"
                        type="file"
                        onChange={this.fileChangeHandler}
                        error={this.fieldHasError('mainImage')}
                        required
                    />
                    <FormElement className="CheckInput"
                                 propertyName="agreement"
                                 type="checkbox"
                                 title="By submitting this form, you confirm that you have read and
                                 agree to the official rules and terms, including the use of your personal data"
                                 value={this.state.agreement}
                                 onChange={this.setAgreement}
                                 required
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}/>
                        <Button className="ml-3" type="submit" color="primary">Publish</Button>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.places.error,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    sendPlace: data => dispatch(sendPlace(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceAdd);