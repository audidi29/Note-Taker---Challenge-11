const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API Routes
require('./routes/apiRoutes')(app);

// HTML Routes
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
