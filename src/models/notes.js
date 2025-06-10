// src/models/notes.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Note = sequelize.define(
  'Note',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'Users', key: 'id' },
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { len: [1, 50] },
    },
    text: {
      type: DataTypes.STRING(300),
      allowNull: false,
      validate: { len: [1, 300] },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    modifiedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeUpdate: (note) => {
        note.modifiedAt = new Date();
      },
    },
  }
);

module.exports = Note;
