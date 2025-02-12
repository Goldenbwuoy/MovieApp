import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import GridCard from './Sections/GridCard'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'
import './LandingPage.css'

import { Typography, Row } from 'antd'
import MainImage from './Sections/MainImage';

const { Title } = Typography


function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=US&page=1`
        fetchMovies(endpoint)
    }, [])

    const fetchMovies = (path) => {
        fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
    }

    // Fetch more movies from the next page when load more button is clicked
    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=US&page=${CurrentPage + 1}` 
        fetchMovies(endpoint)
        
    }
    return (
        <>
           <div className="landingPage">

               { /* Movie main image */}
               {Movies[0] && 
                <MainImage image={`${IMAGE_URL}/w1280${Movies[0].backdrop_path}`} 
                title={Movies[0].original_title} text={Movies[0].overview} />
               }
               

               

               { /* Body */}
               <div style={{ width: '85%', margin: '1rem auto'}}>
                    <Title level={2}>Movies by latest</Title>
                    <hr/>

                    {/* Grid cards */}

                    <Row gutter={[16, 16]}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCard 
                                    image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                    movieId={movie.id}
                                
                                />
                            </React.Fragment>
                        ))}

                    </Row>


                    {/* Load more button */}
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <button onClick={handleClick}>Load More</button>
                    </div>
               </div>
               

               

           </div>
        </>
    )
}

export default LandingPage
