import React, {useEffect, useState} from 'react';
import {shallowEqual, useSelector} from 'react-redux';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

import PageLoader from '../loader';
import { getBreedsById } from '../../apiservice/services';
import * as _ from 'lodash';

import './searchBreed.scss';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const SearchBreed = () => {

    const {breedData} = useSelector((store: any) => ({
        breedData: store.breedData
    }));


    const [nameList, setNameList] = useState<any>([])
    const [selectedBreedId, setSelectedBreedId] = useState<any>();
    const [searchedBreed, setSearchedBreed] = useState<any>([]);
    const [showLoader, setShowLoader] = useState<Boolean>(false);
    const [showAlert, setShowAlert] = useState<Boolean>(false);
    const [alertMsg, setAlertMsg] = useState<string>('');

    const getBreedById = async () => {
        setShowLoader(true);
        try {
            const result = await getBreedsById(selectedBreedId);
            console.log(result)
            setSearchedBreed(result.data);
            setShowLoader(false);
        } catch (error: any) {
            setShowAlert(true)
            setAlertMsg(error.response.data.message)
            setShowLoader(false);
        } finally {
            setShowLoader(false);
        }
    };

    const setShimmerOff = (event: any) => {
        const img = event.target as HTMLImageElement;
        const shimmerDiv = img.previousSibling as HTMLElement;
        img.className = 'card-img-top d-sm-block';
        shimmerDiv.className = 'photo shine d-sm-none';
    }

    //Debounce search API for 1 sec
    var debounce_fun = _.debounce(function () {
        setShowLoader(true);
        getBreedById()
    }, 1000);

    /**
     * Debounce function for API to wait for some seconds
     */
    var debounceFunc = (func: any, timeout: number) => {
        let timer:any;
        return (...args: any) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args)
            }, timeout);
        }
    }     

    useEffect(() => {
        if (breedData) {
            let names:any = [];
            breedData.forEach((breed: any) => {
                names.push({
                    id: breed.id,
                    name: breed.name
                })
            })
            setNameList(names);

        }
    }, [breedData]);

    useEffect(() => {
        //debounce_fun()
        debounceFunc(()=> {
            setShowLoader(true);
            getBreedById()
        }, 1000)()
    }, [selectedBreedId]);

    return (
        <>
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
                    showLoader ? (
                        <PageLoader isLoading={showLoader} />
                     ) : 
                    (
                        searchedBreed && (
                        searchedBreed.map((breedItem: any, idx: number) => {
                        return (

                            <React.Fragment key={idx}>
                            <Col xs={6} md={4} lg={3}>
                                <Card className="mb-3">

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
                    })))
                }

            </Row>
            </div>
        </Container>
        {
            showAlert && (
                <ToastContainer position="top-end">
                    <Toast bg="danger" onClose={() => setShowAlert(false)} delay={3000} autohide>
                        <Toast.Header>
                            Error
                        </Toast.Header>
                        <Toast.Body>{alertMsg}</Toast.Body>
                    </Toast>
                </ToastContainer>
            )
        }
        
        </>
    )
};

export default SearchBreed;