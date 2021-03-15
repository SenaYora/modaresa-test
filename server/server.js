const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const { addResolversToSchema } = require('@graphql-tools/schema')
const resolvers = require('./src/resolvers')

const app = express()

const schema = loadSchemaSync('./src/schema.graphql', {
  loaders: [new GraphQLFileLoader()]
})

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
})

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true
  })
)

app.listen(4000)

console.log('Running a GraphQL API server at http://localhost:4000/graphql')
