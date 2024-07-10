const express = require("express");
const fs = require('fs'); 
const app = express();

const cors=require('cors')
app.use(cors({origin:true}))

let data;

try {
    const rawData = fs.readFileSync('./data.json', 'utf-8'); 
    data = JSON.parse(rawData); 
} catch (err) {
    console.error('Error reading or parsing data.js:', err);
    data = [];
}

app.get("/", (req, res) => { 
    res.json(data);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
