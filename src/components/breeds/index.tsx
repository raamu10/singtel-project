import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import BreedViewModal from '../modal/breed';
import Paginate from '../paginate';
import PageLoader from '../loader';
import { getDogBreeds, getBreedsByPageLimit  } from '../../apiservice/services';
import { sortDataByOrder } from '../../common/utils';
import { BreedAction } from '../../redux/reducers/breedReducer';
import * as _ from 'lodash';


const Breeds = () => {
    const limit = 10;
    const dispatch = useDispatch();

    const [breedsData, setBreedsData] = useState<any>([])
    const [paginateCount, setPaginateCount] = useState<number>(0);
    const [activeNum, setActiveNum] = useState<number>(1);
    const [showLoader, setShowLoader] = useState<Boolean>(false);
    const [breeds, setBreeds] = useState<any>([])
    const [breedDetails, setBreedDetails] = useState<any>({});
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [sortType, setSortType] = useState<String>('asc');


    const getDogBreedsData = async () => {
        setShowLoader(true);
        try {
            const dogBreeds = await getDogBreeds();
            setBreedsData(dogBreeds.data)
            dispatch(BreedAction.SetBreedData(dogBreeds.data))

            const totalBreedsCount = dogBreeds.data.length;
            const avg = totalBreedsCount/limit;

            setPaginateCount(avg > Math.floor(avg) ? Math.floor(avg) + 1 : Math.floor(avg))

        }catch(error) {
            console.log("Error:", error)
        } finally{
            setShowLoader(false);
        }
    }

    const setBreedsByLimit = () => {
        let start =  activeNum === 1 ? activeNum - 1 : ( (limit * activeNum) - limit);
        let end = limit * activeNum;

        const limitdata = _.slice(breedsData, start, end);
        setBreeds(limitdata);
    }

    const sortByType = (type: string) => {

        setActiveNum(1);

        switch(type){
            case 'NAME':
                let nameSortData = sortDataByOrder(breedsData,'name',sortType)
                setBreedsData(nameSortData);
                break;
            

            case 'HEIGHT': 
                let sortHeightData = sortDataByOrder(breedsData, 'height.metric' ,sortType)
                setBreedsData(sortHeightData);
                break;
            

            case 'LIFE_SPAN': 
                let sortLifeSpanData = sortDataByOrder(breedsData, 'life_span' ,sortType)
                setBreedsData(sortLifeSpanData);
                break;
            
        }

    };

    const viewBreedDetails = (breed: any) => {
        setBreedDetails(breed);
        setShowModal(true);   
    }

    useEffect(() => {
        setBreedsByLimit()
    }, [activeNum, breedsData])

    useEffect(() => {
        getDogBreedsData();
    }, [])


    return (
        <div>
            
         {
             showLoader ? (
                <PageLoader isLoading={showLoader} />
             ) : (
                 <>
                 <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th> 
                            <span className="pointer text-decoration-underline" 
                                onClick={() => {sortByType('NAME'); setSortType( sortType === "asc" ? "desc" : "asc" ) } }> 
                                Breed Name <i className="bi bi-arrow-down"></i>
                            </span> 
                        </th>
                        <th> 
                            <span className="pointer text-decoration-underline" 
                                onClick={() => {sortByType('HEIGHT'); setSortType( sortType === "asc" ? "desc" : "asc" )  }}>
                                Height (metric) 
                            </span> 
                        </th>
                        <th> 
                            <span className="pointer text-decoration-underline" 
                                onClick={() => {sortByType('LIFE_SPAN'); setSortType( sortType === "asc" ? "desc" : "asc" ) }}>
                            Life Span 
                            </span> 
                        </th>
                        <th>Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        { breeds &&
                            (
                                breeds.map((breed:any) => {
                                    return (
                                        <tr key={breed.id}>
                                            <td> {breed.id} </td>
                                            <td> {breed.name} </td>
                                            <td> {breed.height.metric} </td>
                                            <td> {breed.life_span} </td>
                                            <td> <span className="pointer" onClick={()=>{viewBreedDetails(breed)}}> View </span> </td>
                                        </tr>

                                    )
                                })
                            )
                        }
                        
                        
                    </tbody>
                </Table>

                <br/>
                
                <div className="float-end">
                    <Paginate pageCount={paginateCount} activeNum={activeNum} setActiveNum={setActiveNum} />
                </div>
                <br />
                 </>

             )
         }
        

        {
            showModal && (
                <BreedViewModal showModal={showModal} setShowModal={setShowModal} breedDetails={breedDetails} />
            )
        }
        
        </div>
    )
};

export default Breeds;