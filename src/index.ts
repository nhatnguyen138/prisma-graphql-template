import { ApolloServer } from 'apollo-server'
import { createContext } from './utils/context'
import { schema } from './schema'

const server = new ApolloServer({
  schema,
  context: createContext
})

server.listen().then(({ url }) => console.log(`Server ready at: ${url}`))