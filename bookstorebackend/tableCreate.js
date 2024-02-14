const pool = require('./db.js');

// Read the createTables.sql file
const fs = require('fs');
const createTablesSql = fs.readFileSync('createTables.sql', 'utf8');

// Connect to the PostgreSQL database and execute the table creation queries
pool.query(createTablesSql)
    .then(() => {
        console.log('Tables created successfully');
        // Start your Express server or perform other actions here
    })
    .catch(error => {
        console.error('Error creating tables:', error);
    });