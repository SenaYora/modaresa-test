const { GraphQLScalarType, Kind } = require('graphql')

// Fake DB
const brands = []

const Types = ["shoes", "clothes", "bags", "hats", "accessories"]

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value)
    },
    serialize(value) {
      return value.getTime()
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT)
        return new Date(parseInt(ast.value, 10))
      return null
    }
  }),
  Query: {
    brand: (parent, { id }, context, info) => {
      return brands.find(brand => `${brand.id.getTime()}` === id)
    },
    brands: (parent, args, context, info) => {
      return brands
    }
  },
  Mutation: {
    createBrand: (parent, { name, createdAt, type, country, description }, context, info) => {
      if (type.length === 0) throw new Error("Type should not be empty.")
      if (type.filter(e => !Types.includes(e)).length != 0) throw new Error(`Type should only contain at least one of those values: [${Types.join(', ')}]`)

      const id = new Date()
      const newBrand = { id, name, createdAt, type, country, description }

      brands.push(newBrand)
      return newBrand
    },
    updateBrand: (parent, { id, name, createdAt, type, country, description }, context, info) => {
      if (type.length === 0) throw new Error("Type should not be empty.")
      if (type.filter(e => !Types.includes(e)).length != 0) throw new Error(`Type should only contain at least one of those values: [${Types.join(', ')}]`)
      const brand = users.find(brand => brand.id === id)

      brand.name = name
      brand.createdAt = createdAt
      brand.type = type
      brand.country = country
      brand.description = description

      return brand
    },
    deleteBrand: (parent, { id }, context, info) => {
      const brandIndex = brands.findIndex(brand => `${brand.id.getTime()}` === id)

      if (brandIndex === -1) throw new Error("Brand not found.")
      const deletedUsers = brands.splice(brandIndex, 1)
      return deletedUsers[0]
    }
  }
}

module.exports = resolvers