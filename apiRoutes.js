const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// GET /api/notes
router.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  res.json(notes);
});

// POST /api/notes
router.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now(); // Assign a unique ID
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes, null, 2));
  res.json(newNote);
});

// DELETE /api/notes/:id
router.delete('/notes/:id', (req, res) => {
  const idToDelete = parseInt(req.params.id);
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
  const updatedNotes = notes.filter(note => note.id !== idToDelete);
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes, null, 2));
  res.json({ message: 'Note deleted' });
});

module.exports = router;
