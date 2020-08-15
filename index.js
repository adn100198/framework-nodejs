const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const { RpInjectionMiddleware } = require('./middlewares/rp-injection');

// Connect Mongoose
const config = require('./config/db');
app.mongoose = config;
app.use(RpInjectionMiddleware);
// Router
const cors = require('cors');
app.use(cors());
const routers = require('./routes');
app.use('/', routers);

app.listen(port, () => {
    console.log(`Starting app ...`);
    console.log(`http://localhost:${port}`);
});