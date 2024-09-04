let ws = null
const connectStatusText = document.querySelector('.connectStatusText')
const sendMsgEl = document.querySelector('#sendMsgEl')
const connectEl = document.querySelector('#connectEl')
const disconnectEl = document.querySelector('#disconnectEl')
const sendBtnEl = document.querySelector('#sendBtnEl')

init()

function init () {
  eventListen()
  connect()
}

// event
function connect() { 
  if (ws) return
  ws = new WebSocket('ws://localhost:8080') 
  // 在開啟連線時執行
  ws.addEventListener('open', () => {
    console.log('[前端] - 連線成功')
    connectStatusText.innerHTML = '連線成功'
    connectStatusText.classList = 'connectStatusText connected'

    ws.addEventListener('message', onMessage)
  })
}
function disconnect() {
  if(!ws) return
  ws.close()
  // 在關閉連線時執行
  ws.addEventListener('close', onClose)
}
function sendMessage() {
   if(sendMsgEl.value) ws.send('[前端] - 傳送訊息給前端')
}
function onMessage (e) {
  console.log('[前端] - 收到後端的訊息: ', e)
}
function onClose () {
  console.log('[前端] - 連線中斷')
  ws = null
  connectStatusText.innerHTML = '尚未連線'
  connectStatusText.classList = 'connectStatusText not-connected'
}
function eventListen () {
  connectEl.addEventListener('click', connect)
  disconnectEl.addEventListener('click', disconnect)
  sendBtnEl.addEventListener('click', sendMessage)
}