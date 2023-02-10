import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import { getBreedsById } from '../../apiservice/services';

import './searchBreed.scss';

const SearchBreed = () => {

    const {breedData} = useSelector((store: any) => ({
        breedData: store.breedData
    }));

    const [nameList, setNameList] = useState<any>([])
    const [selectedBreedId, setSelectedBreedId] = useState<any>();
    const [searchedBreed, setSearchedBreed] = useState<any>([]);
    
    const getBreedById = async () => {
        try {
            const result = await getBreedsById(selectedBreedId);
            setSearchedBreed(result.data);
            console.log(result.data);
        } catch (error) {
            console.log(error)
        }
    };

    const setShimmerOff = (event: any) => {
        const img = event.target as HTMLImageElement;
        const shimmerDiv = img.previousSibling as HTMLElement;
        img.className = 'card-img-top d-sm-block';
        shimmerDiv.className = 'photo shine d-sm-none';
        console.log("img", img);
        console.log("shimmerDiv", shimmerDiv);
    }

    useEffect(() => {
        let names:any = [];
        breedData.forEach((breed: any) => {
            names.push({
                id: breed.id,
                name: breed.name
            })
        })
        setNameList(names);
    }, [breedData]);

    useEffect(() => {
        getBreedById()
    }, [selectedBreedId]);

    return (
        <Container fluid>
            <Row className="g-4">
                <Col md={4}>
                    <FloatingLabel controlId="breedSelect" label="Select Breed">
                        <Form.Select aria-label="Select Breed" value={selectedBreedId} 
                            onChange={(e: any) => {setSelectedBreedId(e.currentTarget.value)}}>
                            <option value="">None</option>
                            {
                                nameList.map((obj: any, idx: any) => {
                                    return (
                                        <option value={obj.id} key={idx}>{obj.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </FloatingLabel>
                </Col>
            </Row>
            <div className="mt-5">
            <Row>

                { 
                    (searchedBreed.map((breedItem: any, idx: number) => {
                        return (

                            <React.Fragment key={idx}>
                            <Col xs={6} md={4} lg={3}>
                                <Card className="mb-3">
                                    {/*  showShimmer && (
                                            <div className="photo shine"></div>
                                        )
                                     */}

                                    <div className="photo shine d-sm-block"></div>
                                    
                                    <Card.Img className={ 'd-sm-none'} variant="top" src={breedItem.url} onLoad={(e) => {
                                        setShimmerOff(e)
                                    }}/>
                                    <Card.Body>
                                    <Card.Title>{breedItem.breeds[0].bred_for}</Card.Title>
                                    <Card.Text>
                                        Tempartment: {breedItem.breeds[0].temperament}
                                    </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted"> Life Span - {breedItem.breeds[0].life_span}</small>
                                    </Card.Footer>
                                </Card>
                            </Col>
                            </React.Fragment>
                        )
                    }))
                }

            </Row>
            </div>
        </Container>
    )
};

export default SearchBreed;