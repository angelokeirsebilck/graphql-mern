require('dotenv').config();

const express = require('express');
var cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();

mongoose.connect(process.env.MONGO_ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to database.');
});
app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(process.env.PORT, () => {
    console.log(`Now listening for requests on port ${process.env.PORT}.`);
});
