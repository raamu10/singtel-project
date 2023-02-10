import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Breeds from '../breeds';
import SearchBreed from '../searchBreed';
import { getDogBreeds } from '../../apiservice/services';
import './home.scss';

const Home = () => {
    const [key, setKey] = useState<any>('breed');
    return (
        <div className="home-container" >
            <div className="mb-4"><h1> Dog Breeds </h1></div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k:any) => setKey(k)}
                className="mb-3"
                >
                <Tab eventKey="breed" title="Breeds">
                    <Breeds />
                </Tab>
                <Tab eventKey="search" title="Search">
                    <SearchBreed />
                </Tab>
            </Tabs>
        </div>
    )
};

export default Home;