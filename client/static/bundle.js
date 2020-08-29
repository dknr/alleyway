window.addEventListener('DOMContentLoaded', () => {
  console.log('starting up');
  const ws = new WebSocket('ws://localhost:3000/ws');
  ws.addEventListener('open', () => {
    console.log('ws open');
  });
  ws.addEventListener('message', (event) => {
    console.log(event.data);
  });
  document.getElementById('test-btn').onclick = (e) => {
    ws.send('click');
  }
});
