const sequelize = require('../db');
const { DataTypes, Model } = require("sequelize");


class User extends Model { }

User.init({
    user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    fullname: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    profile_picture: {
        type: DataTypes.STRING(200),
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'regular'),
        defaultValue: 'regular',
        allowNull: false
    }

}, { sequelize, freezeTableName: true });


module.exports = User;