// Create Express app with express-ws
const express = require('express');
const app = express();
require('express-ws')(app);

const {socketRoute} = require('./router');
app.use('/', socketRoute);

app.listen(3000);
