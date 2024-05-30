const router = require('express').Router();

// models
const User = require('../models/User');
const out = require('../utils/out');
const ResponseContext = require('../utils/response');



router.get('/all', async function (req, res) {
    try {
        const users = await User.findAll();

        if (users.length < 1) {
            res.status(200).json(ResponseContext(true, 'Empty database'));
        } else {
            res.status(200).json(ResponseContext(true, 'Done', users));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


router.get('/:user_id', async function (req, res) {
    try {
        const user = req.params.user_id;

        const uniqueUser = await User.findOne({ where: { user_id: user } });

        if (!uniqueUser.title) {
            res.status(404).json(ResponseContext(false, 'No match found'));
        } else {
            res.status(200).json(ResponseContext(true, null, uniqueUser));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});

router.post('/new_user', async function (req, res) {
    try {
        const { fullname, username, password, profile_picture, role } = req.body;

        const context = {
            fullname,
            username,
            password,
            profile_picture,
            role
        };

        const newUser = await User.create(context);

        if (!newUser) {
            res.status(401).json(ResponseContext(false, 'Something went wrong with the creation'));
        } else {
            res.status(201).json(ResponseContext(true, 'Created', newUser));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


router.put('/update/:user_id', async function (req, res) {
    try {
        const userID = req.params.user_id;
        const { fullname, username, password, profile_picture, role } = req.body;

        const context = {
            fullname,
            username,
            password,
            profile_picture,
            role
        };

        const updated = await User.update(context, { where: { user_id: userID } });
        res.status(201).json(ResponseContext(true, 'Updated', updated));

    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


router.delete('/delete/:user_id', async function (req, res) {
    try {
        const userID = req.params.user_id;

        const user = await User.destroy({ where: { user_id: userID } });
        out({ 'deleted user': user });

        res.status(200).json(ResponseContext(true, 'Deletion successfully'));
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


module.exports = router;