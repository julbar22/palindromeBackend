const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.status(200).json({ result: 'El servidor funciona' });
});

app.listen(PORT, () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
})