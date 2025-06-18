require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // ✅ This line was missing
const setupSwagger = require('./swagger');
const sequelize = require('./utils/database');
const notesRoute = require('./routes/noteRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();

// CORS for local frontend (dev mode)
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://swing-notes-frontend.onrender.com',
    ],
    credentials: true,
  })
);

// Body parser
app.use(bodyParser.json());

// API routes
app.use('/api/notes', notesRoute);
app.use('/api/user', userRoute);

// API check
app.get('/api', (req, res) => {
  res.json({ message: 'API is running 🚀' });
});

// Swagger
setupSwagger(app);

// Serve frontend from Vite's build folder
const publicPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  const indexPath = path.join(publicPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend not found');
  }
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
  .sync()
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
