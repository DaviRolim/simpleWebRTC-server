import express from 'express';
import cors from 'cors';
// Create a new Express app
const app = express();
app.use(cors());
// Set up a route that responds to a GET request at the root path
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
