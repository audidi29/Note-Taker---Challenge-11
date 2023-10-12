const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// GET request for all notes
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// POST request to add a note
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        const notes = JSON.parse(data);
        newNote.id = Date.now();
        notes.push(newNote);

        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});

// DELETE request to remove a note by id
app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
        if (err) throw err;

        let notes = JSON.parse(data);
        notes = notes.filter((note) => note.id !== parseInt(id));

        fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

// ... (previous code)
