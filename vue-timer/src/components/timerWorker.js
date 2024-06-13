
self.onmessage = (e) => {
  const { command, time } = e.data

  let seconds = time || 0

  if (command === 'start') {
    self.interval = setInterval(() => {
      seconds++
      self.postMessage(seconds)
    }, 1000)
  } else if(command === 'stop') {
    clearInterval(self.interval)
  }
}