async function deleteModule(ctx) {
  const { client, query: { system, module } } = ctx
  
  const database = client.db('purity')
  const collection = database.collection(system)
  const result = await collection.deleteMany({ module })
  
  console.log('delete result', result)
  ctx.body = { message: 'success' }
}

export default deleteModule
