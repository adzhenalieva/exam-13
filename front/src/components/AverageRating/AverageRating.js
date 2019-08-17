import React from 'react';
import {Card, CardBody} from "reactstrap";
import RatingLine from "../RatingLine/RatingLine";

const AverageRating = props => {
    return (
        <Card>
            <CardBody>
                <RatingLine text="Average: "
                number={props.average}/>
                <RatingLine text="Food: "
                            number={props.food}/>
                <RatingLine text="Service:"
                            number={props.service}/>
                <RatingLine text="Interior:"
                            number={props.interior}/>
            </CardBody>
        </Card>
    );
};

export default AverageRating;