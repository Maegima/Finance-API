import express from 'express';
import { FinanceRouter } from 'app/router/finance.router';

const app = express()

app.use(FinanceRouter);

// Server port
var port = 5000 
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});