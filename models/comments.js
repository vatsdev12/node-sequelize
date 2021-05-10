"use strict";
/**
 * Comment  Schema
 */

module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define(
        "comments",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            postId: {
                type: DataTypes.INTEGER,
            },
            userId: {
                type: DataTypes.INTEGER,
            },

            comment: {
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

    comments.associate = (models) => {
        comments.belongsTo(models.posts, { sourceKey: 'id', foreignKey: 'postId' })
        comments.belongsTo(models.users, { sourceKey: 'id', foreignKey: 'userId' })
    }

    return comments;
};
