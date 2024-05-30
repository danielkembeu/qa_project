const router = require('express').Router();

// models
const Answer = require('../models/Answer');
const out = require('../utils/out');
const ResponseContext = require('../utils/response');



router.get('/all', async function (req, res) {
    try {
        const answers = await Answer.findAll();

        if (answers.length < 1) {
            res.status(200).json(ResponseContext(true, 'Empty database'));
        } else {
            res.status(200).json(ResponseContext(true, 'Done', answers));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});



router.get('/answers', async function (req, res) {
    try {
        const { limit } = req.query;
        const answers = await Answer.findAll();

        if (limit) {
            const limitedAnswers = answers.slice(0, limit);
            limitedAnswers.length > 1 ?
                res.status(200).json(ResponseContext(true, `Limit: ${limit}`, limitedAnswers)) :
                res.status(200).json(ResponseContext(true, `Limit is going under 1`));
        } else {
            res.status(200).json(ResponseContext(true, 'Done', answers));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});



router.get('/:answer_id', async function (req, res) {
    try {
        const answerID = req.params.answer_id;

        const uniqueAnswer = await Answer.findOne({ where: { answer_id: answerID } });

        if (!uniqueAnswer) {
            res.status(404).json(ResponseContext(false, 'No match found'));
        } else {
            res.status(200).json(ResponseContext(true, null, uniqueAnswer));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});



router.post('/new_answer', async function (req, res) {
    try {
        const { responder, likes, dislikes } = req.body;

        const context = {
            responder,
            likes,
            dislikes
        }

        const newAnswer = await Answer.create(context);

        if (!newAnswer) {
            res.status(401).json(ResponseContext(false, 'Something went wrong with the creation'));
        } else {
            res.status(201).json(ResponseContext(true, 'Created', newAnswer));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


router.put('/update/:answer_id', async function (req, res) {
    try {
        const answerID = req.params.answer_id;
        const { responder, likes, dislikes } = req.body;

        const context = { responder, likes, dislikes };

        const updated = await User.update(context, { where: { user_id: answerID } });
        res.status(201).json(ResponseContext(true, 'Updated', updated));

    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});



router.delete('/delete/:answer_id', async function (req, res) {
    try {
        const answerID = req.params.answer_id;

        const answer = await Answer.destroy({ where: { answer_id: answerID } });
        out({ 'deleted answer': answer });

        res.status(200).json(ResponseContext(true, 'Deletion successfully'));
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});


module.exports = router;