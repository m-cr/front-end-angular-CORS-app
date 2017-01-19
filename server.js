const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const node_modules = path.join(__dirname, 'node_modules')
const angularApp = path.join(__dirname, 'app');

app.use(express.static(node_modules));
app.use(express.static(angularApp));

app.get('/*', (req, res, next) => {
	res.sendFile(indexPath);
});

app.use( (err, req, res, next) => {
	console.error(err);
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(port, () => console.log(`listening on port: ${port}`)); 