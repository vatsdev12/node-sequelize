"use strict";
/**
 * Like  Schema
 */

module.exports = (sequelize, DataTypes) => {
    const likes = sequelize.define(
        "likes",
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
            isLike: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
                comment: "false->Not active , true-> active"
            }
        },
        {
            timestamps: true,
            paranoid: true,
            underscored: false,
            freezeTableName: true
        }
    );

    likes.associate = (models) => {
        likes.belongsTo(models.posts, { sourceKey: 'id', foreignKey: 'postId' })
        likes.belongsTo(models.users, { sourceKey: 'id', foreignKey: 'userId' })
    }

    return likes;
};
