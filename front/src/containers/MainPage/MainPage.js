import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Button, Row} from "reactstrap";
import StarRatings from "react-star-ratings";

import PlaceCard from "../../components/PlaceCard/PlaceCard";
import {deletePlace, fetchPlaces} from "../../store/actions/placeActions";


class MainPage extends Component {
    componentDidMount() {
        this.props.fetchPlaces();
    }

    averageRating = data => {
        let ratings = [];
        data.map(feedback => (
            ratings.push(feedback.rating)
        ));
        const ratingsNum = ratings.length;
        const sum = ratings.reduce((acc, currentVal) => acc += currentVal.average || 0, 0);
        return (sum === 0 && ratingsNum === 0) ? 0 : Math.round((sum / ratingsNum) * 10) / 10
    };

    deletePlace = id => {
        this.props.deletePlace(id);
    };

    render() {
        return (
            <Fragment>
                <h1 className="mb-3">
                    Takea chance to become the cafe critic
                </h1>
                    <Row>
                        {this.props.places.map(place => {
                                const average = this.averageRating(place.feedback);
                                return <PlaceCard
                                    key={place._id}
                                    title={place.title}
                                    id={place._id}
                                    image={place.mainImage}
                                    averageNumber={average}
                                    totalNumber={place.feedback.length}
                                >
                                    <StarRatings
                                        rating={average}
                                        starRatedColor="yellow"
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="40px"
                                        starSpacing="7px"
                                    />
                                    {this.props.user && this.props.user.role === "admin"
                                        ? <Button className="my-4" onClick={() => this.deletePlace(place._id)}
                                                  color="danger">Delete
                                            place</Button>
                                        : null}
                                </PlaceCard>
                            }
                        )}
                    </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places,
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaces: () => dispatch(fetchPlaces()),
        deletePlace: id => dispatch(deletePlace(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);