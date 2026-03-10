// server.js
const app = require('./src/app'); 

const PORT = 3000; // Set local port to port 3000 

app.listen(PORT, () => {
    console.log(`HR Application running on port: ${PORT}`);
    console.log(`URL: http://localhost:${PORT} `);

});
