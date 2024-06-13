
self.onmessage = (e) => {
  console.log('----', e.data)
  const { command, value } = e.data 
  let result = 0
  if (command === 'sum') {
    result = 1000 + value
  } else {
    result = e.data*1000
  }
  //
  self.postMessage(result)
}