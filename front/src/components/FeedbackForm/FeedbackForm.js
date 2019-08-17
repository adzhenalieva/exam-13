import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, FormGroup, Col, Button, Alert, Label, CardBody} from "reactstrap";


import FormElement from "../../components/UI/Form/FormElement";
import StarRatings from "react-star-ratings";
import {sendFeedbackPlace} from "../../store/actions/placeActions";


class FeedbackForm extends Component {

    state = {
        comment: '',
        food: 0,
        service: 0,
        interior: 0,
        average: 0

    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };


    submitFormHandler = async event => {
        event.preventDefault();
        const average = (this.state.food + this.state.interior + this.state.service) / 3;
        const data = {...this.state};
        const id = this.props.id;
        await this.props.sendFeedbackPlace({
            food: data.food,
            service: data.service,
            interior: data.interior,
            comment: data.comment,
            average
        }, id);
        this.setState({
            comment: '',
            food: 0,
            service: 0,
            interior: 0,
            average: 0
        })
    };


    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    changeRating = (newRating, name) => {
        this.setState({[name]: newRating})
    };

    render() {
        return (
            <CardBody>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        Check the internet connection
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>
                    <h2>Leave your feedback</h2>
                    <FormElement
                        propertyName="comment"
                        title="Comment"
                        type="input"
                        value={this.state.comment}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('comment')}
                        placeholder="Enter your comment"
                        required
                    />
                    <FormGroup row>
                        <Label sm={2}>Estimate food</Label>
                        <Col sm={10}>
                            <StarRatings
                                rating={this.state.food}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                starDimension="25px"
                                starSpacing="7px"
                                name="food"
                                changeRating={this.changeRating}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Estimate service</Label>
                        <Col sm={10}>
                            <StarRatings
                                rating={this.state.service}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                starDimension="25px"
                                starSpacing="7px"
                                name="service"
                                changeRating={this.changeRating}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label sm={2}>Estimate interior</Label>
                        <Col sm={10}>
                            <StarRatings
                                rating={this.state.interior}
                                starRatedColor="yellow"
                                numberOfStars={5}
                                starDimension="25px"
                                starSpacing="7px"
                                name="interior"
                                changeRating={this.changeRating}
                            />
                        </Col>
                    </FormGroup>
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
    error: state.places.error,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    sendFeedbackPlace: (data, id) => dispatch(sendFeedbackPlace(data, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);