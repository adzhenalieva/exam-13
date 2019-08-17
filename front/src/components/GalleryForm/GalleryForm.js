import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, FormGroup, Col, Button, Alert, CardBody} from "reactstrap";


import FormElement from "../../components/UI/Form/FormElement";
import {sendGallery} from "../../store/actions/galleriesActions";
import {fetchGalleries} from "../../store/actions/galleriesActions";


class GalleryForm extends Component {

    state = {
        image: ''
    };

    fileChangeHandler = event => {
        let image = new FormData();
        for (let i = 0; i < event.target.files.length; i++) {
            let file = event.target.files[i];
            image.append('image', file);
        }
        image.append("place", this.props.id);
        this.setState({image});
    };


    submitForm = async event => {
        event.preventDefault();
        this.props.sendGallery(this.state.image);

    };

    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <CardBody>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        Check the internet connection
                    </Alert>
                )}
                <Form onSubmit={this.submitForm}>
                    <h2>Load photos</h2>
                    <FormElement
                        propertyName="image"
                        title="Images"
                        type="file"
                        onChange={this.fileChangeHandler}
                        error={this.fieldHasError('image')}
                        required
                        multiple
                    />
                    <p>You may upload up to 5 photos at once</p>
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}/>
                        <Button className="ml-3" type="submit" color="primary">Publish</Button>
                    </FormGroup>
                </Form>
            </CardBody>
        );
    }
}

const mapStateToProps = state => ({
    error: state.galleries.error,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    sendGallery: data => dispatch(sendGallery(data)),
    fetchGalleries: id => dispatch(fetchGalleries(id))

});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryForm);