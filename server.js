const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'verify-email.html'));
});

app.get('/verify-email', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'verify-email.html'));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Verify Email server running on port ${PORT}`);
  });
}

module.exports = app;
