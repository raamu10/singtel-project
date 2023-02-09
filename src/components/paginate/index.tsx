import React, { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';


const Paginate = (props: any) => {

    const { pageCount, setActiveNum } = props;

    const [selectedPage, setSelectedPage] = useState<number>(1)

    console.log("pagecount:", pageCount)

    const getPageButtons = () => {
        let items = []
        if (selectedPage === 1) {
            for(let i = 1; i <=3; i++) {
                items.push(
                    <Pagination.Item key={i} active={i === selectedPage} onClick={() => {
                            setSelectedPage(i)
                    }}>
                        {i}
                    </Pagination.Item>
                )
            }
        } else if (selectedPage === pageCount) {
            for(let i = selectedPage - 2; i <= selectedPage; i++) {
                items.push(
                    <Pagination.Item key={i} active={i === selectedPage} onClick={() => {
                            setSelectedPage(i)
                    }}>
                        {i}
                    </Pagination.Item>
                )
            }

        } else  {
            if (selectedPage  === (pageCount - 1)) {
                for(let i = selectedPage - 1 ; i <= (selectedPage + 1); i++) {
                    items.push(
                        <Pagination.Item key={i} active={i === selectedPage} onClick={() => {
                                setSelectedPage(i)
                        }}>
                            {i}
                        </Pagination.Item>
                    )
                }

            } else {
                for(let i = selectedPage; i <= selectedPage+2; i++) {
                    items.push(
                        <Pagination.Item key={i} active={i === selectedPage} onClick={() => {
                                setSelectedPage(i)
                        }}>
                            {i}
                        </Pagination.Item>
                    )
                }
            }
        }
        return items
    }

    useEffect(() => {
        console.log("Selected Page no:", selectedPage)
        setActiveNum(selectedPage)
    }, [selectedPage])

    return (
        <Pagination>
            <Pagination.First disabled={selectedPage === 1} onClick={() => {setSelectedPage(1)}}/>
            <Pagination.Prev disabled={selectedPage === 1} onClick={() => {setSelectedPage( selectedPage -1 )}}/>
            {
                getPageButtons()
            }
            <Pagination.Next disabled={selectedPage === pageCount} onClick={() => {setSelectedPage( selectedPage + 1 )}}/>
            <Pagination.Last disabled={selectedPage === pageCount} onClick={() => {setSelectedPage(pageCount)}}/>
        </Pagination>
    )

}

export default Paginate;