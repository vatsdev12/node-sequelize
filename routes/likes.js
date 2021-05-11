const express = require('express');
const router = express.Router();
const model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get likes list
router.get('/', (req, res) =>
    model.likes.findAll({ include: [{ model: model.posts }, { model: model.users, attributes: ["firstName", "lastName"] }] })
        .then(users => res.send(users))
        .catch(err => res.send(err)));

// add like 
router.post('/add', (req, res) => {
    let {
        postId,
        userId,
        isLike
    } = req.body;

    let errors = [];
    console.log("req.bodyreq.body", req.body);

    // Validate Fields
    if (!postId) {
        errors.push("postId can't be empty");
    }
    if (!userId) {
        errors.push("userId can't be empty");
    }

    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        // model.likes.findOrCreate({
        //     where: {
        //         postId,
        //         userId,
        //         isLike
        //     }
        // })
        //     .then(user => res.send(user))
        //     .catch(err => res.send(err))

        model.likes.findOne({ where: { postId, userId } })
            .then(function (likeExists) {
                if (likeExists) {
                    model.likes.update({
                        isLike,
                    }, { where: { postId, userId } })
                        .then(like => res.send(like))
                        .catch(err => res.send(err))
                }
                else {
                    model.likes.findOrCreate({
                        where: {
                            postId,
                            userId,
                            isLike
                        }
                    })
                        .then(like => res.send(like))
                        .catch(err => res.send(err))
                }
            })

    }
});



module.exports = router;