const PORT = process.env.PORT || 8000;
const express = require('express');
const cors = require('cors')
const api = require('./routes');

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api', api);

app.get('/', (req, res) => {
    res.status(404).send("ERROR: 404 [PAGE NOT FOUND]");
});

app.listen(PORT, () => console.log(`THE SERVER IS RUNNING ON PORT: ${PORT}`));
