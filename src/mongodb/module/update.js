import { ObjectId } from 'mongodb'

async function updateModule(ctx) {
  const { client, request } = ctx
  const pages = request.body

  const database = client.db('purity')

  for (let i = 0; i < pages.length; i++) {
    const { system, module, _id, page, name, elements, settings } = pages[i]
    const collection = database.collection(system)

    if (_id) {
      const updateDoc = { $set: { page, name, elements, settings } }
      await collection.updateOne({ _id: ObjectId(_id) }, updateDoc)
    
    } else {
      await collection.insertOne(pages[i])
    }
  }

  ctx.body = { message: 'success' }
}

export default updateModule
