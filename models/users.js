"use strict";
/**
 * User  Schema
 */

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.ENUM('male', 'female'),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: false,
            freezeTableName: true
        }
    );

    users.associate = (models) => {
        users.hasMany(models.posts, { foreignKey: 'userId' });
        users.hasMany(models.likes, { foreignKey: 'userId' });
        users.hasMany(models.comments, { foreignKey: 'userId' });

    }

    return users;
};
