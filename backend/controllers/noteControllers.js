// src/noteControllers/notes.js
const Note = require('../models/notes');

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ where: { userId: req.user.id } });
    return res.status(200).json(notes);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

exports.createNote = async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) return res.sendStatus(400);

  try {
    const note = await Note.create({
      title,
      text,
      userId: req.user.id,
    });
    return res.status(201).json(note);
  } catch (err) {
    console.error('❌ createNote error:', err);
    return res.status(500).json({ message: err.message });
  }
};

exports.updateNote = async (req, res) => {
  const { title, text } = req.body;
  const { noteId } = req.params;

  try {
    const note = await Note.findOne({
      where: { noteId, userId: req.user.id },
    });

    if (!note) {
      console.error(
        `❌ Anteckning med noteId=${noteId} hittades inte för user ${req.user.id}`
      );
      return res.status(404).json({ message: 'Anteckning hittades inte' });
    }

    note.title = title ?? note.title;
    note.text = text ?? note.text;
    note.modifiedAt = new Date();

    await note.save();
    return res.status(200).json(note);
  } catch (err) {
    console.error('❌ updateNote error:', err);
    return res.status(500).json({ message: 'Kunde inte uppdatera anteckning' });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const rows = await Note.destroy({
      where: { noteId: req.params.noteId, userId: req.user.id },
    });
    if (!rows) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};
