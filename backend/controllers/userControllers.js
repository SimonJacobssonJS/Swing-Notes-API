// controllers/userControllers.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { UniqueConstraintError } = require('sequelize'); //sequilize error import

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email och lösenord krävs' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash: hash });

    return res.status(201).json({
      message: 'Konto skapat',
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('❌ Signup error:', err);
    if (err instanceof UniqueConstraintError) {
      return res.status(400).json({ message: 'Email redan registrerad' });
    }
    return res.status(500).json({
      message: 'Kunde inte skapa konto, testa igen eller prova andra uppgifter',
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Email och lösenord krävs vid inlogg' });

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Felaktig email' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Felaktigt lösenord' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '6h',
    });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Server error, Kunde inte logga in' });
  }
};
