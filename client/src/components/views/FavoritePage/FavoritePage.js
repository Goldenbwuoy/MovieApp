import React from 'react'
import './FavoritePage.css'

function FavoritePage() {
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

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
