export default () => Bun.serve<string>({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 })
  },
  websocket: {
    async message(ws, message) {
      ws.send(message)

      if (message instanceof Buffer) return

      if (message == "Start")
        console.log("Подключился новый клиент...")
      else {
        const command = message.split('-')
        if (command[0] == 'test')
        {
          const currTime = BigInt(command[1])
          console.log(`На двухсторонний сеанс связи ушло \t${currTime} нс, \t${currTime / BigInt(1000)} мкс, \t${currTime / BigInt(1_000_000)} мс`)
        } else if (command[0] == 'close') {
          const avgTime = BigInt(command[1])
          console.log(`На двухсторонний сеанс связи в среднем ушло \t${avgTime} нс, \t${avgTime / BigInt(1000)} мкс, \t${avgTime / BigInt(1_000_000)} мс`)
        } else {
          console.log(`Неопознанная команда`)
        }
      }
    }
  }
})