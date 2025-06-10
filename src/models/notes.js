// src/models/note.js
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
    timestamps: false, // vi hanterar själva createdAt/modifiedAt
    hooks: {
      beforeUpdate: (note) => {
        // uppdatera modifiedAt automatiskt
        note.modifiedAt = new Date();
      },
    },
  }
);

module.exports = Note;
