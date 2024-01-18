'use strict';

const sequelize = require('sequelize');
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Api extends Model {

        static associate(models) {

        }
    };


Api.init({
    ApiId: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INGEGER,
    },
    City: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    policestation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    officename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    GUBUN: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Tel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false,
    },},
    {
        sequelize,
        modelName: 'Api',
    });
    return Api;
};