const express = require('express');
const router = express.Router();
const model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get post list
// router.get('/', (req, res) =>
//     model.posts.findAll({
//         attributes: [Sequelize.literal(
//             `( SELECT COUNT("likes"."id") FROM "likes" 
//                                 WHERE "likes"."postId" = "posts"."id" 
//                                 AND "likes"."isLike" = 'true')`
//         ), 'likesCount'],
// include:
//     [
//         { model: model.users, attributes: ["firstName", "lastName"] },
//         // { model: model.likes, required: false, },
//         { model: model.comments }],


//     })
//         .then(posts => res.send(posts))
//         .catch(err => console.log("ssssssss", err)
//         ));

// Get post list
router.get('/', (req, res) => {
    let {
        limit,
        offset ,
        userId} = req.query;
    let errors = [];

    offset = +offset;
    limit = +limit;
    userId=+userId;
    if (!limit && isNaN(limit)) {
        errors.push("limit can't be empty");
    }
    if (!offset && isNaN(offset)) {
        errors.push("offset can't be empty");
    }
    if (!userId && isNaN(userId)) {
        errors.push("userId can't be empty");
    }
    if (errors.length > 0) {
        res.send(errors);
    }
    model.posts.findAll({
        attributes: {
            include:
                [
                    [Sequelize.literal(
                        `( SELECT COUNT("likes"."id") FROM "likes" 
                                            WHERE "likes"."postId" = "posts"."id" 
                                            AND "likes"."isLike" = 'true')`
                    ), 'likesCount'],
                    [Sequelize.literal(
                        `( SELECT COUNT("likes"."id") FROM "likes" 
                                            WHERE "likes"."postId" = "posts"."id" 
                                            AND "likes"."userId" = ${userId}
                                            AND "likes"."isLike" = 'true'
                                            )`
                    ), 'isLike']
                ]
        },
        include:
            [
                { model: model.users, attributes: ["firstName", "lastName"] },
                { model: model.comments, limit: 1 }],
        limit,
        offset
    })
        .then(posts => res.send(posts))
        .catch(err => console.log("ssssssss", err)
        )
});

// add post 
router.post('/add', (req, res) => {
    let {
        userId,
        title,
        description,
    } = req.body;

    let errors = [];

    // Validate Fields
    if (!userId) {
        errors.push("userId can't be empty");
    }
    if (!title) {
        errors.push("title can't be empty");
    }
    if (!description) {
        errors.push("description can't be empty");
    }
    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        model.posts.create({
            userId,
            title,
            description,
        })
            .then(post => res.send(post))
            .catch(err => res.send(err))
    }
});

// update post 
router.patch('/update', (req, res) => {
    let {
        postId,
        title,
        description,
    } = req.body;

    let errors = [];

    // Validate Fields
    if (!postId) {
        errors.push("userId can't be empty");
    }
    if (!title) {
        errors.push("title can't be empty");
    }
    if (!description) {
        errors.push("description can't be empty");
    }
    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        model.posts.update({
            title,
            description,
        }, { where: { id: postId } })
            .then(post => res.send("Post has been Updated"))
            .catch(err => res.send(err))
    }
});



// delete post 
router.delete('/delete', (req, res) => {
    let {
        postId
    } = req.body;

    let errors = [];

    // Validate Fields
    if (!postId) {
        errors.push("userId can't be empty");
    }

    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        model.posts.destroy(
            { where: { id: postId } })
            .then(post => res.send("Post has been Deleted"))
            .catch(err => res.send(err))
    }
});




module.exports = router;