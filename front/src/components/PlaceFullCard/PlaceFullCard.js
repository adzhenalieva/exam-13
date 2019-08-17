import React from 'react';
import {CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";

import {apiURL} from "../../constants";

import "./PlaceFullCard.css";

const PlaceFullCard = props => {
    return (
            <CardBody>
                <Row>
                    <Col xs={12} md={6} lg={8}>
                        <CardTitle><h4>{props.title}</h4></CardTitle>
                        <CardText>{props.description}</CardText>
                    </Col>
                    <Col xs={12} md={6} lg={4}> <CardImg className="CardImage" src={apiURL + "/uploads/" + props.image} alt="place"/></Col>
                </Row>
                {props.children}
                
            </CardBody>
    );
};

export default PlaceFullCard;