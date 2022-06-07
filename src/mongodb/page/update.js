import { ObjectId } from 'mongodb'

async function updatePage(ctx) {
  const { client, request } = ctx
  const one = request.body
  const { system, _id, page, name, elements, settings } = one
  
  const database = client.db('purity')
  const collection = database.collection(system)
  const updateDoc = { $set: { page, name, elements, settings } }
  const result = await collection.updateOne({ _id: ObjectId(_id) }, updateDoc)
  
  console.log('update result', result)
  ctx.body = { message: 'success' }
}

export default updatePage
