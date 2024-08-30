var microtime = require('microtime')
const socket = new WebSocket("wss://wss.zmln.ru")

let times: bigint[] = []

let time = process.hrtime.bigint()
let n    = 1
let sending = true

socket.addEventListener("open", event => {
  console.log("Connected...")
  socket.send(`Start`)
});

socket.addEventListener("message", async event => {
  const currTime = process.hrtime.bigint() - time
  console.log(`На двухсторонний сеанс связи №${n} ушло \t${currTime} нс, \t${currTime / BigInt(1000)} мкс, \t${currTime / BigInt(1_000_000)} мс`)
  await Bun.sleep(100)
  n++
  times.push(currTime)
  time = process.hrtime.bigint()
  if (sending)
    socket.send(`test-${currTime}`)
})

process.on('SIGINT', async function() {
  console.log('Received Signal')
  sending = false
  
  let avgTime: bigint = BigInt(0)
  let count: bigint   = BigInt(0)

  times.shift()

  for (let i = 0; i < times.length; i++) {
    avgTime += times[i]
    count++
  }

  avgTime = avgTime / count

  console.log(`На двухсторонний сеанс связи в среднем ушло \t${avgTime} нс, \t${avgTime / BigInt(1000)} мкс, \t${avgTime / BigInt(1_000_000)} мс`)

  socket.send(`close-${avgTime}`)

  socket.close()

  setTimeout(function() {
      console.log('Exit');
      process.exit(1);
  }, 1000);
});