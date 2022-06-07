async function devTest(ctx) {  
  const { client, query = {}, request: { body: params } } = ctx

  console.log('query', query)
  console.log('params', params)
  const data = { query, params }

  const options = [
    { label: '微信', value: 'wechat' },
    { label: '支付宝', value: 'alipay' },
  ]

  if (params) {
    options.push(params)
  }

  console.log('111', params)

  ctx.body = { resultCode: 200, data: options }
}

export default devTest
