const graphql = require('graphql')

const {
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLList
} = graphql

const Edge = (itemType) => {
    return new GraphQLObjectType({
        name: 'EdgeType',
        fields: () => ({
            node: { type: itemType },
            cursor: { type: GraphQLString }
        })
    })
}

const PageInfo = new GraphQLObjectType({
    name: 'PageInfoType',
    fields: () => ({
        startCursor: { type: GraphQLString },
        endCursor: { type: GraphQLString },
        hasNextPage: { type: GraphQLBoolean }
    })
})

const Page = (itemType) => {
    return new GraphQLObjectType({
        name: 'PageType',
        fields: () => ({
            totalCount: { type: GraphQLInt },
            edges: { type: new GraphQLList(Edge(itemType)) },
            pageInfo: { type: PageInfo }
        })
    })
}

/* Helper functions for base64 encoding and decoding */
const convertNodeIdToCursor = (id) => {
    return Buffer.from(id.toString(), 'binary').toString('base64')
}

const convertCursorToNodeId = (cursor) => {
    return Buffer.from(cursor, 'base64').toString('binary')
}

module.exports = {
    Page,
    convertNodeIdToCursor,
    convertCursorToNodeId
}
