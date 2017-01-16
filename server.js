const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

// app.listen(PORT, () => {
// 	console.log('server started on port: ', PORT);
// });
app.listen(process.env.PORT || 8080)
