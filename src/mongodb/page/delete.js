import { ObjectId } from 'mongodb'

async function deletePage(ctx) {
  const { client, query: { system, _id } } = ctx
  
  const database = client.db('purity')
  const collection = database.collection(system)

  const result = await collection.deleteOne({ _id: ObjectId(_id) })
  
  console.log('delete result', result)
  ctx.body = { message: 'success' }
}

export default deletePage
