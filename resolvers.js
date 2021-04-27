
const {
    convertNodeIdToCursor,
    convertCursorToNodeId
} = require('./pagination')

const DataLoader = require("dataloader");
const axios = require('axios')

const AUTH_TOKEN = "Bearer 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"
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// cache loader
const userLoader = new DataLoader(async (args) => {
            
    const { first, afterCursor } = args[0];
    let afterIndex = 0

    const res = await axios.get(`https://api.github.com/users`);
    let data = res.data;

    if (typeof afterCursor === 'string') {
        /* Extracting nodeId from afterCursor */
        let nodeId = convertCursorToNodeId(afterCursor);
        /* Finding the index of nodeId */
        let nodeIndex = data.findIndex(obj => obj.id == nodeId);
        
        if (nodeIndex >= 0) {
            afterIndex = nodeIndex + 1 // 1 is added to exclude the afterIndex node and include items after it
        }
    }
    
    const slicedData = data.slice(afterIndex, afterIndex + first);
    const edges = slicedData.map(node => ({
        node,
        cursor: convertNodeIdToCursor(node.id)
    }))

    let startCursor, endCursor = null;
    if (edges.length > 0) {
        startCursor = convertNodeIdToCursor(edges[0].node.id);
        endCursor = convertNodeIdToCursor(edges[edges.length - 1].node.id);
    }
    let hasNextPage = data.length > afterIndex + first;

    return Promise.resolve([{
        totalCount: data.length,
        edges,
        pageInfo: {
            startCursor,
            endCursor,
            hasNextPage
        }
    }])
});

const userResolver = (args) => {
    return userLoader.load(args);
}

module.exports = {
    userResolver
}
