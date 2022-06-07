async function queryData(ctx) {
  const { client, query: { system, module, page } } = ctx
  const query = page ? { page } : {}
  
  const database = client.db(system)
  const collection = database.collection(module)
  const result = collection.find(query)
  const data = await result.toArray()
  ctx.body = { data }
}

export default queryData
