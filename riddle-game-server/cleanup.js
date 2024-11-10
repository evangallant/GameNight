const sqlite3 = require('sqlite3').verbose();

// Set up the SQLite database (Persistent Database)
const db = new sqlite3.Database('leaderboard.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Delete all records or delete based on conditions
db.serialize(() => {
    db.run(`DELETE FROM leaderboard`, function (err) {
        if (err) {
            return console.error('Error deleting records:', err.message);
        }
        console.log(`Deleted ${this.changes} records.`);
    });

    db.close((err) => {
        if (err) {
            return console.error('Error closing database:', err.message);
        }
        console.log('Database closed.');
    });
});
