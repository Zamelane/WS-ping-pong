import server from '@src/server'
import client from '@src/client'
import argsReader from "@src/utils/argsReader"

const args = [
  {
    defaultName: "url",
    otherNames: ["u"],
    defaultValue: "ws://localhost:3000"
  },
  {
    defaultName: "delay",
    otherNames: ["d"],
    defaultValue: 1000
  },
  {
    defaultName: "limit",
    otherNames: ["l"],
    defaultValue: 25
  },
  {
    defaultName: "server",
    otherNames: ["s"],
    defaultValue: true
  },
  {
    defaultName: "port",
    otherNames: ["p"],
    defaultValue: 3000
  },
  {
    defaultName: "help",
    otherNames: ["h"],
    defaultValue: true
  }
]

const argsReaded = argsReader(args)

if (argsReaded['help']) {
  console.log(
    'Run server:\n'                        +
    '   -s, --server\n'                    +
    '   -p, --port  3000\n'                +
    'Run client:\n'                        +
    '   -u, --url   ws://localhost:3000\n' +
    '   -d, --delay 100\n'                 +
    '   -l, --limit 25\n'
  );
  process.exit(0)
}

if (argsReaded['server'])
  server(argsReaded)
else client(argsReaded)