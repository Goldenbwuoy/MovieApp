import React, { useEffect, useState } from 'react'
import { Button } from "antd";
import axios from 'axios'


function Favorite(props) {

    const [favoriteNumber, setfavoriteNumber] = useState(0)
    const [favorited, setfavorited] = useState(false)

    const variable = {
        userFrom: props.userFrom,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime 
    }

    useEffect(() => {

        axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setfavoriteNumber(response.data.favoriteNumber)                   
                } else {
                    alert('Failed to get favorite number')
                }
            })

        axios.post('/api/favorite/favorited', variable)
            .then(response => {
                if (response.data.success) {
                    setfavorited(response.data.favorited)
                } else {
                    alert('Failed to get favorite info')
                }
            })

    }, [])

    const onClickFavorite = () => {
        if (favorited) {
            //when already favorite
            axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setfavoriteNumber(favoriteNumber - 1)
                        setfavorited(!favorited)
                    }else {
                        alert('Failed to remove from  favorites')
                    }
                })

        }else {
            //when not adding yet
            axios.post('/api/favorite/addToFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setfavoriteNumber(favoriteNumber + 1)
                        setfavorited(!favorited)
                    }else {
                        alert('Failed to add to favorites')
                    }
                })
        }
    }


    return (
        <div>
            <Button onClick={onClickFavorite}>{favorited ? "Remove from Favorite" : "Add To Favorite"} {favoriteNumber}</Button>
        </div>
    )
}

export default Favorite
