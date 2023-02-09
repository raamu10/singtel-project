import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ShimmerThumbnail } from "react-shimmer-effects-18";
import ListGroup from 'react-bootstrap/ListGroup';

const BreedViewModal = (props) => {
    const {showModal, setShowModal, breedDetails} = props;
    const [showShimmer, setShowShimmer] = useState(true);

    const handleClose = () => setShowModal(false);

    return (
        <>

            <Modal
                show={showModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Breed Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                     <Card  className="m-auto" style={{ width: '18rem' }}>
                        { showShimmer && (
                           <ShimmerThumbnail height={150} rounded />
                            )
                        }
                        
                        <Card.Img className={ showShimmer ? 'd-sm-none' : 'd-sm-block'} variant="top" src={breedDetails.image.url} onLoad={() => {
                            console.log("image loaded"); setShowShimmer(false)
                        }}/>

                        <Card.Body>
                            <Card.Title>Details</Card.Title>
                            <Card.Text>
                                Name: {breedDetails.name}
                            </Card.Text>
                            <Card.Text>
                                Origin: {breedDetails.origin}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Height: {breedDetails.height.metric} </ListGroup.Item>
                            <ListGroup.Item>Life Span: {breedDetails.life_span} </ListGroup.Item>
                            <ListGroup.Item>Temperament: {breedDetails.temperament}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    )
};

export default BreedViewModal;