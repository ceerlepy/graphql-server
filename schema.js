const graphql = require('graphql')
const { userResolver } = require('./resolvers')

const {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema
} = graphql

const { Page } = require('./pagination')

const User = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type: GraphQLString },
        login: { type: GraphQLString },
        node_id: { type: GraphQLString },
        avatar_url: { type: GraphQLString },
        gravatar_id: { type: GraphQLString },
        url: { type: GraphQLString },
        html_url: { type: GraphQLString },
        followers_url: { type: GraphQLString },
        following_url: { type: GraphQLString },
        gists_url: { type: GraphQLString },
        starred_url: { type: GraphQLString },
        subscriptions_url: { type: GraphQLString },
        organizations_url: { type: GraphQLString },
        repos_url: { type: GraphQLString },
        events_url: { type: GraphQLString },
        received_events_url: { type: GraphQLString },
        type: { type: GraphQLString },
        site_admin: { type: GraphQLString }
    })
})

const MainQuery = new GraphQLObjectType({
    name: 'MainQueryType',
    fields: {
        users: {
            type: Page(User),
            args: {
                first: { type: GraphQLInt },
                afterCursor: { type: GraphQLString }
            },
            resolve (_parentValue, args) {
                return userResolver(args);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: MainQuery
})
