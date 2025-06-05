require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();
app.use(helmet());
app.use(morgan('combined'));
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
  })
);
app.use(express.json());

// API routes
app.use('/api/donors', require('./routes/donors'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/surveys', require('./routes/surveys'));
app.use('/api/users', require('./routes/users')); // optional

app.get('/', (req, res) => res.send('API running...'));

// Optional: generic error handler (shows backend errors in development)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!', details: err.message });
});

// Connect DB and start server
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => console.log(`Server started`));
});
