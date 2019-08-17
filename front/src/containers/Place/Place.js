import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import InfiniteCarousel from 'react-leaf-carousel';
import PlaceFullCard from "../../components/PlaceFullCard/PlaceFullCard";
import {Button, Card} from "reactstrap";
import FeedbackCard from "../../components/FeedbackCard/FeedbackCard";
import AverageRating from "../../components/AverageRating/AverageRating";
import FeedbackForm from "../../components/FeedbackForm/FeedbackForm";
import {deleteFeedback, fetchPlaceById} from "../../store/actions/placeActions";
import GalleryForm from "../../components/GalleryForm/GalleryForm";
import {fetchGalleries} from "../../store/actions/galleriesActions";
import {apiURL} from "../../constants";


class Place extends Component {

    componentDidMount() {
        this.props.fetchPlaceById(this.props.match.params.id);
        this.props.fetchGalleries(this.props.match.params.id);
    }


    dateFormat = date => {
        let d = new Date(date);
        return <span>{d.toLocaleDateString('ru-GB')} {d.toLocaleTimeString()}</span>;
    };

    deleteFeedback = (placeId, feedbackId) => {
        this.props.deleteFeedback(placeId, feedbackId);
    };

    averageRating = (data, item) => {
        let ratings = [];
        data.map(feedback => (
            ratings.push(feedback.rating)
        ));
        const ratingsNum = ratings.length;
        let sum;
        if (item === "average") {
            sum = ratings.reduce((acc, currentVal) => acc += currentVal.average || 0, 0);
        } else if (item === "food") {
            sum = ratings.reduce((acc, currentVal) => acc += currentVal.food || 0, 0);
        } else if (item === "service") {
            sum = ratings.reduce((acc, currentVal) => acc += currentVal.service || 0, 0);
        } else {
            sum = ratings.reduce((acc, currentVal) => acc += currentVal.interior || 0, 0);
        }

        return (sum === 0 && ratingsNum === 0) ? 0 : Math.round((sum / ratingsNum) * 10) / 10;
    };

    render() {

        return (
            <Card>
                {this.props.place ?
                    <Fragment>
                        <PlaceFullCard
                            title={this.props.place.title}
                            description={this.props.place.description}
                            image={this.props.place.mainImage}>
                            { this.props.galleries.length > 0 ?
                                <InfiniteCarousel
                                    breakpoints={[
                                        {
                                            breakpoint: 500,
                                            settings: {
                                                slidesToShow: 2,
                                                slidesToScroll: 2,
                                            },
                                        },
                                        {
                                            breakpoint: 768,
                                            settings: {
                                                slidesToShow: 3,
                                                slidesToScroll: 3,
                                            },
                                        },
                                    ]}
                                    dots={true}
                                    showSides={true}
                                    sidesOpacity={.5}
                                    sideSize={.1}
                                    slidesToScroll={4}
                                    slidesToShow={4}
                                    scrollOnDevice={true}>

                                    {this.props.galleries.map(gallery => (
                                        gallery.image.map(image => {
                                                return <div>
                                                    <img key={image} src={apiURL + "/uploads/" + image}
                                                         alt="morePhotos"/>
                                                </div>
                                            }
                                        )))}
                                </InfiniteCarousel> : null }
                            </PlaceFullCard>
                        <AverageRating
                            average={this.averageRating(this.props.place.feedback, "average")}
                            food={this.averageRating(this.props.place.feedback, "food")}
                            service={this.averageRating(this.props.place.feedback, "service")}
                            interior={this.averageRating(this.props.place.feedback, "interior")}/>
                        <Card>
                            {this.props.place.feedback.length > 0 ? <h5 className="mx-auto my-2">Comments</h5> : null}
                            {this.props.place.feedback.map(feedback => (
                                <FeedbackCard
                                    key={feedback._id}
                                    datetime={this.dateFormat(feedback.datetime)}
                                    comment={feedback.comment}
                                    displayName={feedback.displayName}
                                    food={feedback.rating.food}
                                    service={feedback.rating.service}
                                    interior={feedback.rating.interior}>
                                    {this.props.user && this.props.user.role === "admin"
                                        ? <Button className="my-4"
                                                  onClick={() => this.deleteFeedback(this.props.place._id, feedback._id)}
                                                  color="danger">Delete
                                            feedback</Button>
                                        : null}
                                </FeedbackCard>
                            ))
                            }
                        </Card>
                        {!this.props.user || (this.props.user && this.props.user._id === this.props.place.user) ?
                            <h5 className="mx-auto my-3">To estimate the recipe and load photos you must ne logged
                                in!</h5> :
                            <FeedbackForm id={this.props.match.params.id}/>}
                        {!this.props.user ? null : <GalleryForm id={this.props.match.params.id}/>}
                    </Fragment>

                    : null}
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        place: state.places.placeById,
        user: state.users.user,
        galleries: state.galleries.galleries
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaceById: id => dispatch(fetchPlaceById(id)),
        deleteFeedback: (placeId, feedbackId) => dispatch(deleteFeedback(placeId, feedbackId)),
        fetchGalleries: id => dispatch(fetchGalleries(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Place);