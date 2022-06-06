const express = require("express")
const api = require('./api');

const app = express()

app.get('/finance/', api.getFinances);
app.get('/type/', api.getTypes);

// Server port
var port = 5000 
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});