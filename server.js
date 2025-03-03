const express = require('express');
const helmet = require('helmet');

const app = express();

// Use helmet to secure HTTP headers
app.use(helmet());

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
