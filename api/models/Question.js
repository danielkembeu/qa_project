const sequelize = require('../db');
const { DataTypes, Model } = require('sequelize');

// Models
const SubjectModel = require('./Subject');
const UserModel = require('./User');
const AnswerModel = require('./Answer');


class Question extends Model { }

Question.init({
    question_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, { sequelize, freezeTableName: true });


// Ajout des cles etrangeres 'client_ref' et 'agent_ref' dans la table Question.
Question.belongsTo(SubjectModel, { foreignKey: "subject_ref" });
SubjectModel.hasMany(Question, { foreignKey: 'subject_ref' });

Question.belongsTo(UserModel, { foreignKey: "author" });
UserModel.hasMany(Question, { foreignKey: 'author' });

Question.belongsTo(AnswerModel, { foreignKey: "answer_ref" });
AnswerModel.hasMany(Question, { foreignKey: 'answer_ref' });


module.exports = Question;
