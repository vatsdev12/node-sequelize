"use strict";
/**
 * Post  Schema
 */

module.exports = (sequelize, DataTypes) => {
    const posts = sequelize.define(
        "posts",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            userId: {
                type: DataTypes.INTEGER,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
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

    posts.associate = (models) => {
        posts.belongsTo(models.users, { sourceKey: 'id', foreignKey: 'userId' })
        posts.hasMany(models.likes, { foreignKey: 'postId' });
        posts.hasMany(models.comments, { foreignKey: 'postId' });

    }

    return posts;
};
