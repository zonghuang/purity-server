const { MongoClient } = require('mongodb')

const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

async function queryData(params) {
  try {
    await client.connect()
    const testdb = client.db('test')
    const inventory = testdb.collection('inventory')
    const cursor = inventory.find({});
    const allValues = await cursor.toArray();
    console.log('all:', allValues)
    return allValues

  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
  }
}

exports.queryData = queryData
