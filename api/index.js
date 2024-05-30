const express = require('express');
const cors = require('cors');
const env = require('./env.js');
const sequelize = require('./db.js');
const out = require('./utils/out.js');


// Routes
const userRoutes = require('./routes/user_routes.js');
const questionRoutes = require('./routes/question_routes.js');
const subjectRoutes = require('./routes/subject_routes.js');
const answerRoutes = require('./routes/answer_routes.js');


// Express initialization
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'*',
    credentials: false 
}));

// Apps routes
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/subjects', subjectRoutes);
app.use('/answers', answerRoutes);

(
    async function run() {
        const PORT = env.PORT;

        try {
            await sequelize.authenticate(async () => out("Database connection successfully"));
            await sequelize.sync({ alter: true });
        } catch (error) {
            out({ error: error.message });
        }

        app.listen(PORT, () => out(`[Express] running on port: ${PORT}`));
    }
)();






