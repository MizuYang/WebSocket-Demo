// import library
const express = require('express')
const ServerSocket = require('ws').Server   // 引用 Server

// 指定一個 port
const PORT = 8080

// 建立 express 物件並用來監聽 8080 port
const server = express()
    .listen(PORT, () => console.log(`[Server] Listening on https://localhost:${PORT}`))

// 建立實體，透過 ServerSocket 開啟 WebSocket 的服務
const wss = new ServerSocket({ server })

wss.on('connection', (ws, req) => {
  // 給每個連線的客戶端一個獨立的 id
  const id = req.headers['sec-websocket-key']
  if (!ws.id) ws.send(`你連線成功 ${id}`) 
    ws.id = id
  console.log('[後端] - 連線成功', id)

  ws.on('message', msg => {
    console.log(msg)

    let clients = wss.clients
    // 使用循環向每個客戶端發送訊息
    clients.forEach(client => {
      client.send(`${ws.id}: ` + msg)
    })

    // console.log('[後端] - 收到訊息: ', msg)
    // ws.send('[後端] 傳送訊息給前端')
    // ws.send({
    //   message: '[後端] - 傳送訊息給前端',
    //   msg
    // })

  })

  ws.on('close', () => {
      console.log('[後端] - 連線中斷')
  })
})