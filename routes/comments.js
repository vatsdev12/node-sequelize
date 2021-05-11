const express = require('express');
const router = express.Router();
const model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get comments list
router.get('/', (req, res) =>
    model.comments.findAll({ include: [{ model: model.posts },{ model: model.users, attributes: ["firstName", "lastName"] }] })
        .then(users => res.send(users))
        .catch(err => res.send(err)));

// add comment 
router.post('/add', (req, res) => {
    let {
        postId,
        userId,
        comment
    } = req.body;

    let errors = [];

    // Validate Fields
    if (!postId) {
        errors.push("postId can't be empty");
    }
    if (!userId) {
        errors.push("userId can't be empty");
    }
    if (!comment) {
        errors.push("comment can't be empty");
    }
    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        model.comments.create({
            postId,
            userId,
            comment
        })
            .then(comment => res.send(comment))
            .catch(err => res.send(err))
    }
});



module.exports = router;