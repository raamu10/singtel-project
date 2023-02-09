import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import './loader.scss';

const PageLoader = (props: any) => {
    const {isLoading} = props

    return (
        <>
        {
            isLoading && (
                <div className="spinner-container">
                    <Spinner animation="border" variant="info" />
                </div>
            )
        }
            
        </>

    )
};

export default PageLoader;