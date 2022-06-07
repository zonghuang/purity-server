function groupBy(objectArray, property) {
  return objectArray.reduce(
    (acc, obj) => {
    let key = obj[property]
    if (!acc[key]) acc[key] = []
    acc[key].push(obj)
    return acc
  }, {})
}

async function findSystem(ctx) {
  const { client, query: { system } } = ctx
  
  const database = client.db('purity')
  const collection = database.collection(system)
  const doc = collection.find({})

  const records = await doc.toArray()
  const categorys = groupBy(records, 'module')

  const data = []
  for (const [key, value] of Object.entries(categorys)) {
    const module = {
      module: key,
      moduleName: '',
      status: '',
      creator: '',
      createdAt: '',
      updater: '',
      updatedAt: '',
      pages: value,
    }
    data.push(module)
  }

  ctx.body = { data }
}

export default findSystem
