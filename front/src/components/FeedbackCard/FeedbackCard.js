import React, {Fragment} from 'react';
import {CardBody, CardText} from "reactstrap";
import RatingLine from "../RatingLine/RatingLine";


const FeedbackCard = props => {
    return (
        <Fragment>
            <CardBody>
                <CardText>
                  Written at {props.datetime}  by {props.displayName}
                </CardText>
                <CardText>
                    Comment: <i><strong>{props.comment}</strong></i>
                </CardText>
                <RatingLine text="Food:" number={props.food}/>
                <RatingLine text="Service:" number={props.service}/>
                <RatingLine text="Interior:" number={props.interior}/>
                {props.children}
            </CardBody>
            <hr/>
        </Fragment>
    );
};

export default FeedbackCard;