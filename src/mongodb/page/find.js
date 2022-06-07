async function findPage(ctx) {
  const { client, query: { system, module, page } } = ctx
  
  const database = client.db('purity')
  const collection = database.collection(system)
  const result = collection.find({ module, page })

  const data = await result.toArray()
  ctx.body = { data }
}

export default findPage
