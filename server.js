const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');

app.get('/*', (req, res, next) => {
	res.sendFile(indexPath);
})

app.listen(port, () => console.log(`listening on port: ${port}`)); 