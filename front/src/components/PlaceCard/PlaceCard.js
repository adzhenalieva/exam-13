import React from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle, Col} from "reactstrap";


import {apiURL} from "../../constants";
import {Link} from "react-router-dom";

const PlaceCard = props => {

    return (
        <Col xs="12" md="6" lg="4">
            <Card className="mb-5">
                <CardBody>
                    <CardImg top className="CardImage" src={apiURL + "/uploads/" + props.image} alt="place"/>
                    <CardTitle>
                        <Link to={"/place/" + props.id}> {props.title}</Link>
                    </CardTitle>
                    {props.children}
                    <CardText className="mt-2">
                        <span>Average: {props.averageNumber}</span>
                    </CardText>
                    <CardText>
                        <span>Number of reviews: {props.totalNumber}</span>
                    </CardText>
                </CardBody>
            </Card>
        </Col>
    );
};

export default PlaceCard;