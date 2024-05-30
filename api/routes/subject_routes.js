const router = require('express').Router();

// models
const Subject = require('../models/Subject');
const out = require('../utils/out');
const ResponseContext = require('../utils/response');



router.get('/all', async function (req, res) {
    try {
        const subjects = await Subject.findAll();

        if (subjects.length < 1) {
            res.status(200).json(ResponseContext(true, 'Empty database'));
        } else {
            res.status(200).json(ResponseContext(true, 'Done', subjects));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


router.get('/:subject_id', async function (req, res) {
    try {
        const subjectID = req.params.subject_id;

        const uniqueSubject = await Subject.findOne({ where: { subject_id: subjectID } });

        if (!uniqueSubject.title) {
            res.status(404).json(ResponseContext(false, 'No match found'));
        } else {
            res.status(200).json(ResponseContext(true, null, uniqueSubject));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});

router.post('/new_subject', async function (req, res) {
    try {
        const { title, likes } = req.body;

        const context = {
            title,
            likes
        }

        const newSubject = await Subject.create(context);

        if (!newSubject.title) {
            res.status(401).json(ResponseContext(false, 'Something went wrong with the creation'));
        } else {
            res.status(201).json(ResponseContext(true, 'Created', newSubject));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


router.delete('/delete/:subject_id', async function (req, res) {
    try {
        const subjectID = req.params.subject_id;

        const subject = await Subject.destroy({ where: { subject_id: subjectID } });
        out({ 'deleted subject': subject });

        res.status(200).json(ResponseContext(true, 'Deletion successfully'));
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


module.exports = router;