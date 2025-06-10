require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const setupSwagger = require('./swagger');

const sequelize = require('./utils/database');

// Routrar
const notesRoute = require('./routes/noteRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

// Mounta API-ändpunkter
app.use('/api/notes', notesRoute);
app.use('/api/user', userRoute);

// Mount Swagger UI
setupSwagger(app);

sequelize
  .authenticate()
  .then(() => console.log('Databasen är uppkopplad'))
  .catch((err) => {
    console.error('Kunde inte koppla till databasen:', err);
    process.exit(1);
  });

sequelize
  .sync({ force: true })
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Servern kör på http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('Sync fel:', err);
    process.exit(1);
  });
