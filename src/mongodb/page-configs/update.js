import { ObjectId } from 'mongodb'

async function updateConfigs(ctx) {
  const { client, request } = ctx
  const { system, pages } = request.body

  const database = client.db('purity')

  for (let i = 0; i < pages.length; i++) {
    const collection = database.collection(system)
    const { _id } = pages[i]

    if (_id) {
      const { page, pageName, elements, settings } = pages[i]
      const updater = 'zonghuang' // 临时，后面根据登录信息判断
      const updatedAt = new Date()
      
      const updateDoc = { $set: { page, pageName, elements, settings, updater, updatedAt } }
      await collection.updateOne({ _id: ObjectId(_id) }, updateDoc)
    
    } else {
      const creator = 'zonghuang' // 临时，后面根据登录信息判断
      const createdAt = new Date()
      const updater = 'zonghuang' // 临时，后面根据登录信息判断
      const updatedAt = new Date()

      const insertDoc = Object.apply({}, pages[i], { creator, createdAt, updater, updatedAt })
      await collection.insertOne(insertDoc)
    }
  }

  ctx.body = { message: 'success' }
}

export default updateConfigs
