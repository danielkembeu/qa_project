const sequelize = require('../db');
const { DataTypes, Model } = require('sequelize');


class Answer extends Model { }

Answer.init({
    answer_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    responder: {
        type: DataTypes.STRING(10),
        allowNull: false
    },

    likes: {
        type: DataTypes.INTEGER(),
        defaultValue: 0
    },

    dislikes: {
        type: DataTypes.INTEGER(),
        defaultValue: 0
    }
}, { sequelize, freezeTableName: true });

module.exports = Answer;
