import Koa from 'koa'
import mount from 'koa-mount'
import body from 'koa-body'
import { MongoClient } from 'mongodb'

import { findConfigs, updateConfigs, deleteConfigs } from './mongodb/page-configs/index.js'
import { findSystem } from './mongodb/system-management/index.js'

import deployPurity from './deploy/index.js'

//
import { findPage, insertPage, updatePage, deletePage } from './mongodb/page/index.js'
import { findModule, updateModule, deleteModule } from './mongodb/module/index.js'
import devTest from './mongodb/test.js'
//

const hostname = '0.0.0.0'
const port = 9000

const uri = "mongodb://zonghuang.cn:27017"
const client = new MongoClient(uri)

async function connectMongo(ctx, next) {
  await client.connect()
  ctx.client = client
  await next()
  await client.close()
}


const app = new Koa()
app.use(body())
app.use(connectMongo)

app.use(mount('/api/purity-page/find', findPage))
app.use(mount('/api/purity-page/insert', insertPage))
app.use(mount('/api/purity-page/update', updatePage))
app.use(mount('/api/purity-page/delete', deletePage))

app.use(mount('/api/purity-module/find', findModule))
app.use(mount('/api/purity-module/update', updateModule))
app.use(mount('/api/purity-module/delete', deleteModule))


app.use(mount('/api/purity-system/find', findSystem))

app.use(mount('/api/purity-configs/find', findConfigs))
app.use(mount('/api/purity-configs/update', updateConfigs))
app.use(mount('/api/purity-configs/delete', deleteConfigs))


app.use(mount('/api/purity-deploy', deployPurity))

app.use(mount('/dev/test', devTest))

app.on('error', (err, ctx) => {
  console.log('server error', err)
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
