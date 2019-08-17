import React from 'react';
import StarRatings from "react-star-ratings";
import "./RatingLine.css";

const RatingLine = props => {
    return (
        <div>
            <span className="RatingLine">{props.text}</span>
            <StarRatings
                rating={props.number}
                starRatedColor="yellow"
                numberOfStars={5}
                starDimension="25px"
                starSpacing="7px"
            />
            <span className="RatingLine2">{props.number}</span>
        </div>
    );
};

export default RatingLine;