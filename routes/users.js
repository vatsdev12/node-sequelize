const express = require('express');
const router = express.Router();
const model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get users list
router.get('/', (req, res) =>
    model.users.findAll({include:[{model:model.posts}]})
        .then(users => res.send(users))
        .catch(err => res.send(err)));

// add user 
router.post('/add', (req, res) => {
    let {
        firstName,
        lastName,
        gender,
        email,
        password
    } = req.body;

    let errors = [];

    // Validate Fields
    if (!firstName) {
        errors.push("FirstName can't be empty");
    }
    if (!lastName) {
        errors.push("lastName can't be empty");
    }
    if (!gender) {
        errors.push("gender can't be empty");
    }
    if (!email) {
        errors.push("email can't be empty");
    }
    if (!password) {
        errors.push("password can't be empty");
    }

    // Check for errors
    if (errors.length > 0) {
        res.send(errors);
    }
    else {
        // Insert into table
        model.users.create({
            firstName,
            lastName,
            gender,
            email,
            password
        })
            .then(user => res.send(user))
            .catch(err => res.send(err))
    }
});



module.exports = router;