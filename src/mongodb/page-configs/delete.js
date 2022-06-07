import { ObjectId } from 'mongodb'

async function deleteConfigs(ctx) {
  const { client, query: { system, module, _id } } = ctx
  
  const database = client.db('purity')
  const collection = database.collection(system)

  if (_id) {
    const result = await collection.deleteOne({ _id: ObjectId(_id) })
    console.log('delete result', result)

  } else {
    const result = await collection.deleteMany({ module })
    console.log('delete result', result)
  }

  ctx.body = { message: 'success' }
}

export default deleteConfigs
