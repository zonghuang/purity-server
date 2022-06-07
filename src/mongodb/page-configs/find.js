async function findConfigs(ctx) {
  const { client, query: { system, module, page } } = ctx
  const query = page ? { module, page } : { module }
  
  const database = client.db('purity')
  const collection = database.collection(system)
  const doc = collection.find(query)

  console.log('8', system, module, page)

  const data = await doc.toArray()
  ctx.body = { data }
}

export default findConfigs
