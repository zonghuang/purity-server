import { spawn } from 'child_process'

const rumCmd = () => {
  return new Promise((resolve, reject) => {
    // 在 deploy 目录下执行 sh deploy.sh 命令
    const child = spawn('sh', ['deploy/deploy.sh'])

    let msg = ''
    child.stdout.on('data', (data) => {
      // shell 执行的 log 在这里搜集，可以通过接口返回给前端
      console.log(`stdout: ${data}`)
      // 普通接口仅能返回一次，需要把 log 都搜集到一次，在 end 时 返回给前端
      msg += `${data}`
    });

    child.stdout.on('end', (data) => {
      // 执行完毕后，接口 resolve，返回给前端
      resolve(msg)
    });

    child.stderr.on('data', (data) => {
      // 如果发生错误，错误从这里输出
      console.error(`stderr: ${data}`)
      msg += `${data}`
    });

    child.on('close', (code) => {
      // 执行完成后正常退出就是 0 
      console.log(`child process exited with code ${code}`)
    });
  })
}

async function deployPurity(ctx) {
  const { client, query, request: { body: params } } = ctx
  // console.log(client)
  console.log(query)
  // console.log(params)

  try {
    const res = await rumCmd()
    ctx.body = { code: 0, data: res }
  } catch (err) {
    ctx.body = { code: -1, data: err.message }
  }
}

export default deployPurity
