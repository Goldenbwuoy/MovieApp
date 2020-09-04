import React, { useEffect, useState } from 'react'
import './FavoritePage.css'
import axios from 'axios'
import { Popover } from 'antd'
import { IMAGE_URL } from '../../Config'

function FavoritePage() {

    const variables = { userFrom: localStorage.getItem('userId')}
    const [FavoriteMovies, setFavoriteMovies] = useState([])

    useEffect(() => {
        axios.post('/api/favorite/getFavoriteMovie', variables)
         .then(response  => {
             if (response.data.success) {
                setFavoriteMovies(response.data.favorites)
             }else {
                 alert('Failed to get favorite movies')
             }
         })
    }, [])

    const renderTableBody = FavoriteMovies.map((movie, index) => {

        const content = (
            <div>
                {movie.movieImage ? 
                <img src={`${IMAGE_URL}w500${movie.movieImage}`} alt="moviePost" />
                :
                "No Image"
            }
            </div>
        )

        return (
            <tr key={index}>
                <Popover content={content} title={`${movie.movieTitle}`}>
                    <td>{movie.movieTitle}</td>
                </Popover>
                
                <td>{movie.movieRunTime} minutes</td>
                <td><button>Remove</button></td>
            </tr>
        )
    })

    return (
        
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h3>My Favorite Movies</h3>
            <hr/>
            <table>
                <thead>
                    <tr key="">
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>
                    </tr>

                </thead>
                <tbody>

                    {renderTableBody}

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
