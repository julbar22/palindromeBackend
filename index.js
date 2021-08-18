const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

/**
 * El codigo cataloga como palindromos todo aquellos con las mismas letras,
 * no tiene en cuenta acentos o signos de puntuacion.
 */
app.get('/iecho', (req, res) => {
    const { text } = req.query;
    if (text) {
        const textClean = text.split(" ").join('')
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z]/g, "");
        const reversedText = textClean.split('').reverse().join('');
        return res.status(200).json({ text: reversedText, palindrome: textClean === reversedText });
    }
    return res.status(400).json({ error: 'no text' });

});

app.listen(PORT, () => {
    console.log(`server working in port ${PORT}`);
})


module.exports = app;