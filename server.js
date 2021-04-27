const express = require('express')
const expressGraphQL = require('express-graphql')
const depthLimit = require('graphql-depth-limit')
const schema = require('./schema')

const app = express()
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
    validationRules: [ depthLimit(10) ] // depth limit for the queries [SECURITY]
}))

//naïve approach I considered was to limit the incoming query size by raw bytes [SECURITY]
app.use('*', (req, _res, next) => {
    const query = req.query.query || req.body.query || '';
    if (query.length > 2000) {
      throw new Error('Query too large');
    }
    next();
});

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})
