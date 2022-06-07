async function insertPage(ctx) {
  const { client, request } = ctx
  const one = request.body
  
  const database = client.db('purity')
  const collection = database.collection(one.system)
  const result = await collection.insertOne(one)
  
  console.log('insert result', result)
  ctx.body = { message: 'success' }
}

export default insertPage
