async function findModule(ctx) {
  const { client, query: { system, module } } = ctx
  
  const database = client.db('purity')
  const collection = database.collection(system)
  const result = collection.find({ module })

  const data = await result.toArray()
  ctx.body = { data }
}

export default findModule
