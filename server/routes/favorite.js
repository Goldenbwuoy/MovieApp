const express = require('express');
const router = express.Router();

const { auth } = require("../middleware/auth");
const {Favorite} = require('../models/Favorite');

//=================================
//             Favorite
//=================================



router.post("/favoriteNumber", (req, res) => {
    //find favorite information inside favorite collection by movie id
    
    Favorite.find({'movieId': req.body.movieId})
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, favoriteNumber: favorite.length})
        })
});

router.post("/favorited", (req, res) => {
    // find favorited information inside Favorite collection by Movie id and, userFrom
    Favorite.find({'movieId': req.body.movieId, 'userFrom': req.body.userFrom})
        .exec((err, favorite) => {
            if (err) return res.status(400).send(err)

            //How can I know if I already added the movie to my favorite list
            let result = false
            if (favorite.length != 0) {
                result = true
            }

            res.status(200).json({ success: true, favorited: result })
        })
    
    
});

router.post("/addToFavorite", (req, res) => {
    
    //Save the info about the movie and user id in the Favorite collection
    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, doc })
    })
    
    
    
});

router.post("/removeFromFavorite", (req, res) => {
    
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom})
        .then((doc, err) => {
            if (err) return res.status(400).json({ success: false, err})
            res.status(200).json({ success: true })
        })
});

router.post("/getFavoriteMovie", (req, res) => {
    
    Favorite.find({ 'userFrom': req.body.userFrom})
        .exec((err, favorites) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites})
        })
});





module.exports = router;
