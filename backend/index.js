require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const setupSwagger = require('./swagger');
const sequelize = require('./utils/database');

const notesRoute = require('./routes/noteRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();

// CORS for local frontend (dev mode)
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Body parser
app.use(bodyParser.json());

// API routes
app.use('/api/notes', notesRoute);
app.use('/api/user', userRoute);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'API is running 🚀' });
});

// Swagger
setupSwagger(app);

// Serve frontend (if deployed together)
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Database connect + sync
sequelize
  .authenticate()
  .then(() => console.log('✅ Connected to database'))
  .catch((err) => {
    console.error('❌ Could not connect to database:', err);
    process.exit(1);
  });

sequelize
  .sync() // No `force: true` to avoid data loss
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`✅ Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ Database sync error:', err);
    process.exit(1);
  });
