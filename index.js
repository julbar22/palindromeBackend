const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get('/iecho', (req, res) => {
    const { text } = req.query;
    if (text) {
        const textClean =text.split(" ").join('').toLowerCase();
        const reversedText = textClean.split('').reverse().join('');
        res.status(200).json({ text: reversedText, palindrome: textClean === reversedText });
    } else {
        res.status(400).json({ error: 'no text' });
    }
});

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})