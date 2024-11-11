const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const app = express();
const port = 3000;

// Set up the SQLite database (Persistent Database)
const db = new sqlite3.Database('leaderboard.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Middleware setup
const allowedOrigins = [
    'http://localhost:8000', // Local development
    'https://your-github-username.github.io' // GitHub Pages deployment
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin, like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST', // Allow only GET and POST requests
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};
app.use(cors(corsOptions)); // Use CORS with specific configuration

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to store a user's session data
app.post('/submit-session', (req, res) => {
    const { name, timeTaken } = req.body;

    const query = `INSERT INTO leaderboard (name, time_taken) VALUES (?, ?)`;

    db.run(query, [name, timeTaken], function(err) {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ success: true, userNumber: this.lastID });
    });
});

// Endpoint to get leaderboard data
app.get('/leaderboard', (req, res) => {
    db.all('SELECT name, time_taken FROM leaderboard ORDER BY time_taken ASC', [], (err, rows) => {
        if (err) {
            console.error('Database error:', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});