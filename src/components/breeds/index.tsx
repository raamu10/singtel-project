import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import BreedViewModal from '../modal/breed';
import Paginate from '../paginate';
import PageLoader from '../loader';
import { getBreedsByPageLimit  } from '../../apiservice/services';
import { sortDataByOrder } from '../../common/utils';

interface BreedsProp {
    breedCount: number
}

const Breeds = ({breedCount} : BreedsProp) => {

    const totalBreedsCount = breedCount;
    const limit = 10;
    const avg = totalBreedsCount/limit;
    const paginateCount = avg > Math.floor(avg) ? Math.floor(avg) + 1 : Math.floor(avg);
    
    const [activeNum, setActiveNum] = useState<number>(1);
    const [showLoader, setShowLoader] = useState<Boolean>(false);
    const [breeds, setBreeds] = useState<any>([])
    const [breedDetails, setBreedDetails] = useState<any>({});
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [sortType, setSortType] = useState<String>('asc');
    

    /* const getPaginationItems = () => {
        let items: any = [];

        for (let number = 1; number <= paginateCount; number++) {
            items.push(
                <Pagination.Item key={number} active={number === activeNum} onClick={() => {
                    setActiveNum(number)
                }}>
                {number}
                </Pagination.Item>,
            );
        }
        return items;
    } */

    const getBreedsByLimit = async () => {
        setShowLoader(true);
        try {
            const breedData = await getBreedsByPageLimit(limit, activeNum - 1)
            setBreeds(breedData.data)
        } catch(error) {
            console.log("Error:", error)
        } finally{
            setShowLoader(false);
        }
    };

    const sortByType = (type: string) => {
        switch(type){
            case 'NAME':
                console.log("NameSort")
                let nameSortData = sortDataByOrder(breeds,'name',sortType)
                setBreeds(nameSortData);
                break;
            

            case 'HEIGHT': 
                let sortHeightData = sortDataByOrder(breeds, 'height.metric' ,sortType)
                setBreeds(sortHeightData);
                break;
            

            case 'LIFE_SPAN': 
                let sortLifeSpanData = sortDataByOrder(breeds, 'life_span' ,sortType)
                setBreeds(sortLifeSpanData);
                break;
            
        }

    };

    const viewBreedDetails = (breed: any) => {
        setBreedDetails(breed);
        setShowModal(true);   
    }

    useEffect(() => {
        getBreedsByLimit()
    }, [activeNum])


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
                                Name
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
                {/* <Pagination>
                    {
                        getPaginationItems()
                    }
                </Pagination> */}
                <div className="float-end">
                    <Paginate pageCount={paginateCount} setActiveNum={setActiveNum}/>
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