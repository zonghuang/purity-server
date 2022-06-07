async function createData(ctx) {
  const { client } = ctx
  const database = client.db('purity')
  const collection = database.collection('page')

  console.log('ctx', ctx.request.body)

  const records = ctx.request.body
  const result = await collection.insertMany(records)
  console.log('result', result)
  ctx.body = ctx.request.body
}

export default createData
