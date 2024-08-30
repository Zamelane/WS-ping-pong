import server from '@src/server'
import client from '@src/client'
import argsReader from "@src/utils/argsReader"

const args = [
  {
    defaultName: "url",
    otherNames: [],
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
  }
]

const argsReaded = argsReader(args)

if (argsReaded['server'])
  server()
else client(argsReaded)