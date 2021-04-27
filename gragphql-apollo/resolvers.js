const axios = require('axios')

const AUTH_TOKEN = "Bearer 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"

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const resolvers = {
    Query: {
        async users (_parent, _args, _context, _info) {

            const res = await axios.get(`https://api.github.com/users`);

            return res.data
        }
    }
}

module.exports = resolvers
