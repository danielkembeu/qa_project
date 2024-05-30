const router = require('express').Router();

// models
const Question = require('../models/Question');
const out = require('../utils/out');
const ResponseContext = require('../utils/response');



router.get('/all', async function (req, res) {
    try {
        const questions = await Question.findAll();

        if (questions.length < 1) {
            res.status(200).json(ResponseContext(true, 'Empty database'));
        } else {
            res.status(200).json(ResponseContext(true, 'Done', questions));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});



router.get('/questions', async function (req, res) {
    try {
        const { limit } = req.query;
        const questions = await Question.findAll();

        if (limit) {
            const limitedQuestions = questions.slice(0, limit);
            limitedQuestions.length > 1 ?
                res.status(200).json(ResponseContext(true, `Limit: ${limit}`, limitedQuestions)) :
                res.status(200).json(ResponseContext(true, `Limit is going under 1`));
        } else {
            res.status(200).json(ResponseContext(true, 'Done', questions));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});



router.get('/:question_id', async function (req, res) {
    try {
        const questionID = req.params.question_id;

        const uniqueQuestion = await Question.findOne({ where: { question_id: questionID } });

        if (!uniqueQuestion) {
            res.status(404).json(ResponseContext(false, 'No match found'));
        } else {
            res.status(200).json(ResponseContext(true, null, uniqueQuestion));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});



router.post('/new_question', async function (req, res) {
    try {
        const { content, subject_ref, author, answer_ref } = req.body;

        const context = { content, subject_ref, author, answer_ref };

        const newQuestion = await Question.create(context);

        if (!newQuestion) {
            res.status(401).json(ResponseContext(false, 'Something went wrong with the creation'));
        } else {
            res.status(201).json(ResponseContext(true, 'Created', newQuestion));
        }
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});




router.delete('/delete/:question_id', async function (req, res) {
    try {
        const questionID = req.params.question_id;

        const question = await Question.destroy({ where: { question_id: questionID } });
        out({ 'deleted Question': question });

        res.status(200).json(ResponseContext(true, 'Deletion successfully'));
    } catch (error) {
        res.status(404).json(ResponseContext(false, error.message));
    }
});



module.exports = router;