const { Pool, Client } = require('pg');
const connectionString = "postgressql://postgres:root@localhost:5432/postgres";

const client = new Client({
    connectionString
});

client.connect();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(router);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

router.get('/company', async (req, res, err) => {
    await client.query('SELECT * from company', (err, response) => {
        res.send(response.rows);
    });
});

router.post('/add-company', async(req, res, err) => {
    const { company_name, company_location } = req.body;
    await client.query('INSERT INTO company values($1, $2)', [company_name, company_location], (err, response) => {
        console.log(response);
        return response.rowCount;
    });
});

router.delete('/delete-company/:index', async (req, res, err) => {
    client.query('DELETE FROM company WHERE id = $1', [req.params.index], (error, response) => {
        return response.rowCount;
    });
});

router.put('/update-company', async (req, res, err) => {
    const { company_name, company_location, id } = req.body;
    client.query('UPDATE company SET name = $1, location = $2 WHERE id = $3', [company_name, company_location, id], (error, response) => {
        return response.rowCount;
    });
});
