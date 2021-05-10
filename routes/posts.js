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


router.get('/', (req, res) => {
    let userId = 1;
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
    })
        .then(posts => res.send(posts))
        .catch(err => console.log("ssssssss", err)
        )
});

// add user 
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



module.exports = router;