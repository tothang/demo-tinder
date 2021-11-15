'use strict';
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        picture: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        dateOfBirth: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    }, {
        tableName: 'users',
        timestamps: true,
        defaultScope: {
            attributes: {exclude: []},
        },
        scopes: {
            withPassword: {
                attributes: {},
            },
        },
        hooks: {},
        instanceMethods: {}
    });
};
