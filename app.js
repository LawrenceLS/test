const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const adminRoutes = require('./routes/admin');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware - place BEFORE routes
app.use(session({
    secret: 'your_secret_key',  // change this to a secure secret or use environment variable
    resave: false,
    saveUninitialized: false,
    cookie: { /* secure: true if using https */ }
}));

// Mount admin routes
app.use('/admin', adminRoutes);

// Redirect root to login page
app.get('/', (req, res) => {
    res.redirect('/admin/login');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
