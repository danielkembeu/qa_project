const sequelize = require('../db');
const { DataTypes, Model } = require('sequelize');


class Subject extends Model { }

Subject.init({
    subject_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    question_count: {
        type: DataTypes.INTEGER(),
        defaultValue: 0
    },
    likes: {
        type: DataTypes.INTEGER(),
        defaultValue: 0
    }
}, { sequelize, freezeTableName: true });


module.exports = Subject;
