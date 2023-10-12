const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        fs.readFile('../db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            res.json(JSON.parse(data));
        });
    });

    app.post('/api/notes', (req, res) => {
        const newNote = {
            ...req.body,
            id: uuidv4()  // assigning a unique ID
        };

        fs.readFile('../db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }

            const notes = JSON.parse(data);
            notes.push(newNote);

            fs.writeFile('../db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).end();
                }
                res.json(newNote);
            });
        });
    });
};
