const { Op } = require('sequelize');
const Note = require('../models/notes');

exports.searchNotes = async (req, res) => {
  const { query } = req.query;
  const userId = req.user.id;

  if (!query) {
    return res.status(400).json({ message: 'Söksträng saknas' });
  }

  try {
    const results = await Note.findAll({
      where: {
        userId,
        title: {
          [Op.iLike]: `%${query}%`, // Case-insensitive search
        },
      },
    });

    return res.status(200).json(results);
  } catch (err) {
    console.error('❌ searchNotes error:', err);
    return res.status(500).json({ message: 'Fel vid sökning av titel' });
  }
};
