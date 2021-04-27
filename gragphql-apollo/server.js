const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { createServer } = require('http')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const app = express()
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: 'http://localhost:3000/graphql',
        settings: {
            'editor.theme': 'light'
        }
    }
})
server.applyMiddleware({ app })

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen(3000, () => {
    console.log('connected!')
})