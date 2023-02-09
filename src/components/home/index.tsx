import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Breeds from '../breeds';
import { getDogBreeds } from '../../apiservice/services';
import './home.scss';

const Home = () => {
    const [key, setKey] = useState<any>('breed');
    const [breedCount, setBreedCount] = useState<number>(0)

    const getDogBreedsDataCount = async () => {
        try {
            const dogBreeds = await getDogBreeds()
            console.log(dogBreeds.data)
            setBreedCount(dogBreeds.data.length)
        }catch(error) {

        }
    }

    useEffect(() => {
        getDogBreedsDataCount()
    }, [])
    return (
        <div className="home-container" >
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k:any) => setKey(k)}
            className="mb-3"
            >
            <Tab eventKey="breed" title="Breed">
                <Breeds breedCount={breedCount} />
            </Tab>
            <Tab eventKey="other" title="Other">
                <div>Others</div>
            </Tab>
            {/* <Tab eventKey="contact" title="Contact">
           
            </Tab> */}
        </Tabs>
        </div>
    )
};

export default Home;