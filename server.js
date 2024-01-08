// server.js
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/photos/:gender', async (req, res) => {
    try {
        const gender = req.params.gender;
        const photosDir = path.join(__dirname, 'public', 'photos', gender);
        const photoFiles = await fs.readdir(photosDir);

        // Filter out files that begin with .
        const validPhotoFiles = photoFiles.filter(file => !file.startsWith('.'));

        // Returns the file name of an image of the specified gender
        res.json(validPhotoFiles);
    } catch (error) {
        console.error(`Error fetching ${req.params.gender} photo list:`, error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
