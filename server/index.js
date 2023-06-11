const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./database');
const { errorHandler, notFound }= require('./middleware/error.js');
var cors = require('cors');

dotenv.config();

connectToMongo();

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json())

//Available routes
app.use('/api/product', require('./routes/product'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/cart', require('./routes/cart'))

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`E-commerce backend listening at http://localhost:${port}`);
})