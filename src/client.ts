import type { IArg } from "./interfaces";

export default (args: IArg) => {
  const URL   = String(args['url'])
  const DELAY = Number(args['delay'])
  const LIMIT = Number(args['limit'])
  
  const socket = new WebSocket(URL)
  
  socket.addEventListener('open', () => {
    console.log(`Connected to ${URL}`)
    socket.send('Start')
  });
  
  socket.addEventListener('error', () => {
    console.error(`Connect failed to ${URL}`)
    process.exit(10);
  });
  
  const times: bigint[] = []
  let start = process.hrtime.bigint()
  let n = 1
  let sending = true
  
  socket.addEventListener('message', async () => {
    const time = process.hrtime.bigint() - start
  
    console.log(
      `#${n.toString().padStart(4, '0')}:` + 
      ` ${(time             ).toString().padStart(12, ' ')} ns` + 
      ` ${(time /     1_000n).toString().padStart(8 , ' ')} mcs` +
      ` ${(time / 1_000_000n).toString().padStart(4 , ' ')} ms`
    )
  
    await Bun.sleep(DELAY)
    n++
    times.push(time)
    start = process.hrtime.bigint()
    if (sending)
      socket.send(`test-${time}`)
  
    if (n > LIMIT) {
      console.log(`Limit reached (${LIMIT} requests)`)
      exit()
    }
  })
  
  process.on('SIGINT', async () => {
    console.log('Interrupted by user')
    exit(1)
  });
  
  function exit(code = 0) {
    sending = false
    
    const avgTime = times.reduce((a, b) => a + b, 0n) / BigInt(times.length)
  
    console.log(
      `For ${URL} by ${times.length} requests:\nAVG: ` +
      ` ${(avgTime             ).toString().padStart(13, ' ')} ns` + 
      ` ${(avgTime /     1_000n).toString().padStart(8 , ' ')} mcs` +
      ` ${(avgTime / 1_000_000n).toString().padStart(4 , ' ')} ms`
    )
  
    socket.send(`close-${avgTime}`)
    socket.close()
    process.exit(code);
  }
  
}