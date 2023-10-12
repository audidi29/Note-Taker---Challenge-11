const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Develop', 'public')));

// API Routes
apiRoutes(app);

// HTML Routes
htmlRoutes(app);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
