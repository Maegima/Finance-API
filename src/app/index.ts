import express from 'express';
import { FinanceRouter, AccountRouter, HistoryRouter } from 'app/router';
import bodyParser from 'body-parser';

const app = express()

app.use(bodyParser.json());
app.use([FinanceRouter, AccountRouter, HistoryRouter]);

// Server port
var port = 5000 
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});